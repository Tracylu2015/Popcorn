package com.popcornbackend.repos;

import com.popcornbackend.models.UserLike;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserLikeRepo extends MongoRepository<UserLike, String> {
    List<UserLike> findAll();

    Optional<UserLike> findUserLikeByCommentIdAndAndUserId(String userId, String commentId);

    void deleteUserLikeByUserIdAndCommentId(String userId, String commentId);
    
}