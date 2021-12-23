package com.popcornbackend.repos;

import com.popcornbackend.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String> {

    Page<Comment> findAllByMovieId(String movieId, Pageable pageable);

    Page<Comment> findAllByUserId(String userId, Pageable pageable);

    Comment deleteCommentById(String id);

    long countByUserId(String userId);

    long countByMovieId(String movieId);
}