package com.popcornbackend.services;


import com.popcornbackend.models.Movie;
import com.popcornbackend.models.UserWatchStatus;
import com.popcornbackend.repos.UserWatchStatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WatchService {

    @Autowired
    UserWatchStatusRepo userWatchStatusRepo;

    public void createWishList(String userId, String movieId) {
        UserWatchStatus status = new UserWatchStatus();
        status.setMovieId(movieId);
        status.setUserId(userId);
        status.setStatus(UserWatchStatus.STATUS_WISH);
        userWatchStatusRepo.save(status);
    }

    public void createWatchedList(String userId, String movieId) {
        UserWatchStatus status = new UserWatchStatus();
        status.setMovieId(movieId);
        status.setUserId(userId);
        status.setStatus(UserWatchStatus.STATUS_WATCHED);
        userWatchStatusRepo.save(status);
    }

    public Movie updateMovieStatus(String userId, Movie movie) {
        if (movie == null) return null;
        UserWatchStatus status = userWatchStatusRepo.findAllByUserIdAndMovieId(userId, movie.getId());
        if (status != null) {
            movie.setWatchStatus(status.getStatus());
        }
        return movie;
    }

    public List<UserWatchStatus> findWishList(String userId) {
        return userWatchStatusRepo.findAllByUserIdAndStatus(userId, UserWatchStatus.STATUS_WISH);
    }
}