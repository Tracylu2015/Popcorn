package com.popcornbackend.services;

import com.popcornbackend.models.UserLike;
import com.popcornbackend.repos.UserLikeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserLikeService {

    @Autowired
    UserLikeRepo userLikeRepo;

    public UserLike createOne(UserLike userLike) {
        return userLikeRepo.save(userLike);
    }

    public boolean findUserLikeByCommentIdAndUserId(String commentId, String userId) {
        return userLikeRepo.findUserLikeByCommentIdAndAndUserId(commentId, userId).orElse(null) != null;
    }

    public void deleteOne(String userId, String commentId) {
        userLikeRepo.deleteUserLikeByUserIdAndCommentId(userId, commentId);
    }
}