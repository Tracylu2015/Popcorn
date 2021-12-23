package com.popcornbackend.utils;

import com.popcornbackend.controllers.MovieController;
import com.popcornbackend.models.Comment;
import com.popcornbackend.models.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseUtil {
    //public function of each get movie route
    public static ResponseEntity<Map<String, Object>> getMapResponseEntity(int page, long maxPage, List<Movie> movies) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("movies", movies);
        resp.put("currentPage", page);
        resp.put("nextPage", page + 1);
        resp.put("maxPage", Math.min(maxPage, MovieController.MAX_PAGE_COUNT));
        resp.put("totalSize", movies.size());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    public static ResponseEntity<Map<String, Object>> getCommentMapResponseEntity(int page, long maxPage,
                                                                                  List<Comment> comments) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("comments", comments);
        resp.put("currentPage", page);
        resp.put("nextPage", page + 1);
        resp.put("maxPage", Math.min(maxPage, MovieController.MAX_PAGE_COUNT));
        resp.put("totalSize", comments.size());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

}
