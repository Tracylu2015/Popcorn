package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.User;
import com.popcornbackend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movie")
public class CommentController {
    @Autowired
    CommentService commentService;

    //get all comment by movie id
    @GetMapping("/comment/movie/{id}")
    public List<Comment> getAllByMovieId(
            @PathVariable("id")String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ){
        PageRequest request = PageRequest.of(page, size);
        return commentService.getCommentByMovieId(id, request);
    }

    //get all comment by user id
    @GetMapping("/comment/user/{id}")
    public List<Comment> getAllByUserId(
            @PathVariable("id")String id,
            @RequestParam(value = "sort", defaultValue = "totalLikes") String sort,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ){
        PageRequest request = PageRequest.of(page, size);
        return commentService.getCommentByUserId(id, request);
    }

    @PostMapping("/comment/new")
    public ResponseEntity<Object> createComment(@RequestBody Comment comment, HttpSession session) {
        if(session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME) != null) {
            Comment newComment = commentService.createComment(comment);
            return new ResponseEntity<>(newComment, HttpStatus.OK);
        }
        else{
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Have to login");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
    }




}
