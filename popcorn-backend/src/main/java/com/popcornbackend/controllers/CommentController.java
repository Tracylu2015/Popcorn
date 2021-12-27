package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.Movie;
import com.popcornbackend.services.CommentService;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.UserLikeService;
import com.popcornbackend.services.UserService;
import com.popcornbackend.utils.ResponseUtil;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    CommentService commentService;
    @Autowired
    MovieService movieService;
    @Autowired
    UserService userService;

    @Autowired
    UserLikeService userLikeService;

    //get all comment by movie id
    @GetMapping("/movie/{id}")
    public ResponseEntity<Map<String, Object>> getAllByMovieId(
            @PathVariable("id") String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "4") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            HttpSession session
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Comment> comments = commentService.getCommentByMovieId(id, request);
        for (Comment comment : comments) {
            String myUserId = UserUtil.getUserId(session);
            comment.setLikeStatus(userLikeService.findUserLikeByCommentIdAndUserId(comment.getId(), myUserId));
        }
        long maxPage = commentService.countByMovieId(id) / size;
        return ResponseUtil.getCommentMapResponseEntity(page, maxPage, comments);
    }

    //get all comment by user id
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getAllByUserId(
            HttpSession session,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "4") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        String userId = UserUtil.getUserId(session);
        List<Comment> comments = getComments(size, page, userId);
        long maxPage = commentService.countByUserId(userId) / size;
        return ResponseUtil.getCommentMapResponseEntity(page, maxPage, comments);
    }

    //Add a new comment
    @PostMapping("/new")
    public ResponseEntity<Object> createComment(@RequestBody HashMap<String, String> body, HttpSession session) {
        String userId = UserUtil.getUserId(session);
        if (userId != null) {
            Comment comment = new Comment();
            comment.setPost(body.get("post"));
            comment.setMovieId(body.get("movieId"));
            comment.setUserId(userId);
            Comment newComment = commentService.createComment(comment);
            newComment.setUser(userService.findById(userId));
            return new ResponseEntity<>(newComment, HttpStatus.OK);
        } else {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Have to login");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
    }

    //delete comments by user id and comment id
    @GetMapping("/delete/{id}")
    public List<Comment> deleteCommentByCommentId(
            HttpSession session,
            @PathVariable("id") String id,
            @RequestParam(value = "size", defaultValue = "4") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        String userId = UserUtil.getUserId(session);
        Comment comment = commentService.findCommentById(id);
        if (!userId.equals(comment.getUserId())) {
            return null;
        }
        commentService.deleteCommentById(id);
        return getComments(size, page, userId);
    }

    // render all comments by movie id and update like status
    private List<Comment> getComments(int size, int page, String userId) {
        PageRequest request = PageRequest.of(page, size);
        List<Comment> comments = commentService.getCommentByUserId(userId, request);
        for (Comment comment : comments) {
            Movie movie = movieService.findMovieById(comment.getMovieId());
            comment.setLikeStatus(userLikeService.findUserLikeByCommentIdAndUserId(comment.getId(), userId));
            comment.setMovie(movie);
        }
        return comments;
    }
}
