package com.popcornbackend.services;

import com.popcornbackend.models.MovieRating;
import com.popcornbackend.repos.MovieRatingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieRatingService {

    @Autowired
    MovieRatingRepo movieRatingRepo;

    public void createOne(MovieRating movieRating) {
        movieRatingRepo.save(movieRating);
    }

    public MovieRating findScore(String userId, String movieId) {
        return movieRatingRepo.findMovieRatingByUserIdAndMovieId(userId, movieId);
    }
}
