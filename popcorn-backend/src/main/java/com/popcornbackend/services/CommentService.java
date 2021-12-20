package com.popcornbackend.services;

import com.popcornbackend.models.Comment;
import com.popcornbackend.repos.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentService {

    @Autowired
    CommentRepo commentRepo;

    public List<Comment> getCommentByMovieId(String movieId){
        return commentRepo.findAllByMovieIdOrderByTotalLikesDesc(movieId);
    }
}
