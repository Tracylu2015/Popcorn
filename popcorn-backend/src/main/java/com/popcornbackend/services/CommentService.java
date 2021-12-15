package com.popcornbackend.services;

import com.popcornbackend.repos.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CommentService {

    @Autowired
    CommentRepo commentRepo;
}
