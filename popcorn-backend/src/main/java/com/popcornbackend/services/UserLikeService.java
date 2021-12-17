package com.popcornbackend.services;

import com.popcornbackend.repos.CommentRepo;
import com.popcornbackend.repos.UserLikeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserLikeService {

    @Autowired
    UserLikeRepo userLikeRepo;
}