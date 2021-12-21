package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.Movie;
import com.popcornbackend.models.User;
import com.popcornbackend.services.CommentService;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.UserService;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.FindByIndexNameSessionRepository;
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

    //get all comment by movie id
    @GetMapping("/movie/{id}")
    public List<Comment> getAllByMovieId(
            @PathVariable("id") String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Comment> comments = commentService.getCommentByMovieId(id, request);
        for (Comment comment : comments) {
            User user = userService.findById(comment.getUserId());
            comment.setUser(user);
        }

        return comments;
    }

    //get all comment by user id
    @GetMapping("/user")
    public List<Comment> getAllByUserId(
            HttpSession session,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        String userId = UserUtil.getUserId(session);
        PageRequest request = PageRequest.of(page, size);
        List<Comment> comments = commentService.getCommentByUserId(userId, request);
        for (Comment comment : comments) {
            Movie movie = movieService.findMovieById(comment.getMovieId());
            comment.setMovie(movie);
        }
        return comments;
    }

    @PostMapping("/new")
    public ResponseEntity<Object> createComment(@RequestBody Comment comment, HttpSession session) {
        if (session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME) != null) {
            Comment newComment = commentService.createComment(comment);
            return new ResponseEntity<>(newComment, HttpStatus.OK);
        } else {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Have to login");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/delete/{id}")
    public Comment deleteComment(
            @PathVariable("id") String id,
            HttpSession session){
        String userId = UserUtil.getUserId(session);
        Comment comment = commentService.findCommentById(id);
        if(!userId.equals(comment.getUserId())){
            return null;
        }
        return commentService.deleteCommentById(id);
    }


    //create new score and update movie score and num of votes
    @PostMapping("/score/new")
    public Movie createScore(@RequestBody HashMap<String, String> body, HttpSession session) {
        String userId = UserUtil.getUserId(session);
        if (userId == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setScore(Integer.parseInt(body.get("score")));
        comment.setMovieId(body.get("movieId"));
        commentService.save(comment);
        Movie movie = movieService.findMovieById(body.get("movieId"));
        float score = movie.getScore();
        int votes = movie.getNumOfVotes();
        float updatedScore = (score * votes + Integer.parseInt(body.get("score"))) / (votes + 1);
        movie.setScore(updatedScore);
        movie.setNumOfVotes(votes + 1);
        return movie;
    }


}
