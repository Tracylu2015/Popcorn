package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/movie")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping("/{id}")
    public Movie getOne(@PathParam(value = "id") String id) {
        return movieService.findMovieById(id);
    }

    //get top 12 movies
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = movieService.getMovies(request);
        Map<String, Object> resp = new HashMap<>();
        resp.put("movies", movies);
        resp.put("currentPage", page);
        resp.put("nextPage", page + 1);
        resp.put("totalSize", movies.size());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/categories/{genres}")
    public List<Movie> getByGenres(@PathParam("genres") String genres){
        return movieService.getMoviesByGenres(genres);
    }

    @GetMapping("/categories/{language}")
    public List<Movie> getByLanguage(@PathParam("language") String lan){
        return movieService.getMoviesByGenres(lan);
    }
}
