package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class CommentController {
    @Autowired
    CommentService commentService;

    //get all comment by movie id
    @GetMapping("/comment/{id}")
    public List<Comment> getCommentByMovieId(
            @PathVariable("id") String id){
        return commentService.getCommentByMovieId(id);
    }
}
