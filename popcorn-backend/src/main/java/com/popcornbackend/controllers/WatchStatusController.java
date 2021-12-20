package com.popcornbackend.controllers;

import com.popcornbackend.services.WatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/watchStatus")
public class WatchStatusController {
    public static final String USER_ID = "userId";
    public static final String MOVIE_ID = "mId";
    @Autowired
    WatchService watchService;

    @PostMapping("/wishList")
    public void createWishList(@RequestBody HashMap<String, String> body) {
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
}
