package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.models.UserWatchStatus;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.WatchService;
import com.popcornbackend.utils.ResponseUtil;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    //add a new movie to the wishlist
    @PostMapping("/wishList")
    public void createWishList(
            @RequestBody HashMap<String, String> body) {
        String userId = body.get(USER_ID);
        String movieId = body.get(MOVIE_ID);
        watchService.createWishList(userId, movieId);
    }

    //add a new movie to the watch list
    @PostMapping("/watched")
    public void createWatchedList(@RequestBody HashMap<String, String> body) {
        String userId = body.get(USER_ID);
        String movieId = body.get(MOVIE_ID);
        watchService.createWatchedList(userId, movieId);
    }

    //get all by user id
    @GetMapping("/wishList/all")
    public ResponseEntity<Map<String, Object>> getAllwishList(
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            HttpSession session
    ) {
        String userId = UserUtil.getUserId(session);
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = getMoviesByStatus(userId, UserWatchStatus.STATUS_WISH, request);
        long maxPage = countMovieByStatus(userId, UserWatchStatus.STATUS_WATCHED) / size;
        return ResponseUtil.getMapResponseEntity(page, maxPage, movies);
    }

    //get all by user id
    @GetMapping("/watchList/all")
    public ResponseEntity<Map<String, Object>> getAllwatchList(
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            HttpSession session
    ) {
        String userId = UserUtil.getUserId(session);
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = getMoviesByStatus(userId, UserWatchStatus.STATUS_WATCHED, request);
        long maxPage = countMovieByStatus(userId, UserWatchStatus.STATUS_WATCHED) / size;
        return ResponseUtil.getMapResponseEntity(page, maxPage, movies);
    }

    //extract duplicates
    public List<Movie> getMoviesByStatus(String userId, String status, PageRequest request) {
        if (userId == null) {
            return new ArrayList<>();
        }
        List<UserWatchStatus> statuses = watchService.findList(userId, status, request);
        List<String> mids = statuses.stream().map(UserWatchStatus::getMovieId).collect(Collectors.toList());
        List<Movie> movies = movieService.findMovieByIds(mids);
        return movies;
    }

    //count movies to do the pagination
    public long countMovieByStatus(String userId, String status) {
        if (userId == null) {
            return 0;
        }
        return watchService.countList(userId, status);
    }
}
