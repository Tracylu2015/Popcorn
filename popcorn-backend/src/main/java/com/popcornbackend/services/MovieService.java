package com.popcornbackend.services;

import com.popcornbackend.repos.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    MovieRepo movieRepo;
}
