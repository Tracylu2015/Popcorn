package com.popcornbackend.listeners;

import com.popcornbackend.models.Comment;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class CommentListener extends AbstractMongoEventListener<Comment> {
    @Autowired
    UserService userService;
    @Autowired
    MovieService movieService;

    @Override
    public void onAfterConvert(AfterConvertEvent<Comment> event) {
        super.onAfterConvert(event);
        Comment source = event.getSource();
        String movieId = source.getMovieId();
        if (movieId != null) source.setMovie(movieService.findMovieById(movieId));
        String userId = source.getUserId();
        if (userId != null) source.setUser(userService.findById(userId));
    }
}
