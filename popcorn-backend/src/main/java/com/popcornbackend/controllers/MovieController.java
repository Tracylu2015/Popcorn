package com.popcornbackend.controllers;

import com.popcornbackend.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

    @Autowired
    MovieService movieService;

}
