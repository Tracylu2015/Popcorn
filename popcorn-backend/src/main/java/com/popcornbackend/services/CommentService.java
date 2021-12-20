package com.popcornbackend.services;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.Movie;
import com.popcornbackend.repos.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CommentService {

    @Autowired
    CommentRepo commentRepo;

    public List<Comment> getCommentByMovieId(String movieId, PageRequest request){
        return commentRepo.findAllByMovieId(movieId, request).getContent();
    }

    public List<Comment> getCommentByUserId(String userId, PageRequest request){
        return commentRepo.findAllByUserId(userId, request).getContent();
    }

    public Comment createComment(Comment comment){
        return commentRepo.save(comment);
    }


}
