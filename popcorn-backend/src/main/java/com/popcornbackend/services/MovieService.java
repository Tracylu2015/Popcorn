package com.popcornbackend.services;

import com.popcornbackend.models.Movie;
import com.popcornbackend.repos.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    MovieRepo movieRepo;

    public List<Movie> findAllMovies(){
        return movieRepo.findAll();
    }

    List<Movie> findAllMovieContain(String query){
        return movieRepo.findAllByPrimaryTitleContaining(query);
    }

    List<Movie> findAllMovieContainAndSortByScoreDesc(String query){
        return movieRepo.findAllByPrimaryTitleOrderByScoreDesc(query);
    }
}
