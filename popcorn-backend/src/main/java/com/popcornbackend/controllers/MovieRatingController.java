package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.models.MovieRating;
import com.popcornbackend.services.MovieRatingService;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
@RequestMapping("/api/rating")
public class MovieRatingController {

    @Autowired
    MovieRatingService movieRatingService;
    @Autowired
    MovieService movieService;

    // create a new score
    @PostMapping("/score")
    public Movie createScore(@RequestBody HashMap<String, String> body, HttpSession session) {
        String userId = UserUtil.getUserId(session);

        MovieRating thisRating = movieRatingService.findScore(userId, body.get("movieId"));
        if (thisRating == null) {
            thisRating = new MovieRating();
            thisRating.setUserId(userId);
            thisRating.setMovieId(body.get("movieId"));
        }
        thisRating.setMovieRatingScore(Integer.parseInt(body.get("score")));
        movieRatingService.createOne(thisRating);
        Movie thisMovie = movieService.findMovieById(body.get("movieId"));
        float newScore = (thisMovie.getScore() * thisMovie.getNumOfVotes() + Integer.parseInt(body.get("score"))) / (thisMovie.getNumOfVotes() + 1f);
        thisMovie.setScore(newScore);
        thisMovie.setNumOfVotes(thisMovie.getNumOfVotes() + 1);
        thisMovie.setMovieRatingScore(Integer.parseInt(body.get("score")));
        return movieService.updateOne(thisMovie);
    }

    //get rating score by user id and movie id
    @GetMapping("getScore/{id}")
    public MovieRating getScore(@PathVariable("id") String movieId, HttpSession session) {
        String userId = UserUtil.getUserId(session);
        return movieRatingService.findScore(userId, movieId);
    }
}
