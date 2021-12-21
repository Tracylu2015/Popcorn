package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.models.UserWatchStatus;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.WatchService;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/watchStatus")
public class WatchStatusController {
    public static final String USER_ID = "userId";
    public static final String MOVIE_ID = "mId";
    @Autowired
    WatchService watchService;

    @Autowired
    MovieService movieService;

    @PostMapping("/wishList")
    public void createWishList(
            @RequestBody HashMap<String, String> body) {
        String userId = body.get(USER_ID);
        String movieId = body.get(MOVIE_ID);
        watchService.createWishList(userId, movieId);
    }

    @PostMapping("/watched")
    public void createWatchedList(@RequestBody HashMap<String, String> body) {
        String userId = body.get(USER_ID);
        String movieId = body.get(MOVIE_ID);
        watchService.createWatchedList(userId, movieId);
    }
    @GetMapping("/wishList/all")
    public List<Movie> getAllwishList(HttpSession session){
        String userId = UserUtil.getUserId(session);
        return getMoviesByStatus(userId, UserWatchStatus.STATUS_WISH);
    }
    @GetMapping("/watchList/all")
    public List<Movie> getAllwatchList(HttpSession session){
        String userId = UserUtil.getUserId(session);
        return getMoviesByStatus(userId, UserWatchStatus.STATUS_WATCHED);
    }

    //extract duplicates
    public List<Movie> getMoviesByStatus(String userId, String status) {
        if (userId == null) {
            return new ArrayList<>();
        }
        List<UserWatchStatus> statuses = watchService.findList(userId, status);
        List<String> mids = statuses.stream().map(UserWatchStatus::getMovieId).collect(Collectors.toList());
        List<Movie> movies = movieService.findMovieByIds(mids);
        return movies;
    }
}
