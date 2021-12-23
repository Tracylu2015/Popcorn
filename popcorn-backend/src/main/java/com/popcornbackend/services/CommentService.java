package com.popcornbackend.services;

import com.popcornbackend.models.Comment;
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

    public List<Comment> getCommentByUserId(String userId, PageRequest request) {
        return commentRepo.findAllByUserId(userId, request).getContent();
    }

    public Comment createComment(Comment comment) {
        return commentRepo.save(comment);
    }


    public Comment save(Comment comment) {
        return commentRepo.save(comment);
    }

    public Comment findCommentById(String id) {
        Optional<Comment> comment = commentRepo.findById(id);
        return comment.orElse(null);
    }

    public Comment deleteCommentById(String commentId) {
        return commentRepo.deleteCommentById(commentId);
    }

    public Comment updateOne(Comment comment) {
        return commentRepo.save(comment);
    }

    public long countByMovieId(String movieId) {
        return commentRepo.countByMovieId(movieId);
    }

    public long countByUserId(String userId) {
        return commentRepo.countByUserId(userId);
    }
}
