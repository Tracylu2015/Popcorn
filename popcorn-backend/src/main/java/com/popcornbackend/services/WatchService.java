package com.popcornbackend.services;


import com.popcornbackend.repos.UserWatchStatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WatchService {

    @Autowired
    UserWatchStatusRepo userWatchStatusRepo;
}