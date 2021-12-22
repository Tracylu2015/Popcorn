package com.popcornbackend.listeners;

import com.popcornbackend.models.MovieRating;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class MovieRatingListener extends AbstractMongoEventListener<MovieRating> {
    @Autowired
    UserService userService;
    @Autowired
    MovieService movieService;

    @Override
    public void onAfterConvert(AfterConvertEvent<MovieRating> event) {
        super.onAfterConvert(event);
        MovieRating source = event.getSource();
        String movieId = source.getMovieId();
        source.setMovie(movieService.findMovieById(movieId));
        source.setUser(userService.findById(source.getUserId()));
    }
}
