package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.Movie;
import com.popcornbackend.services.CommentService;
import com.popcornbackend.services.MovieService;
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

    //get all comment by movie id
    @GetMapping("/movie/{id}")
    public List<Comment> getAllByMovieId(
            @PathVariable("id") String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        return commentService.getCommentByMovieId(id, request);
    }

    //get all comment by user id
    @GetMapping("/user/{id}")
    public List<Comment> getAllByUserId(
            @PathVariable("id") String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        return commentService.getCommentByUserId(id, request);
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
