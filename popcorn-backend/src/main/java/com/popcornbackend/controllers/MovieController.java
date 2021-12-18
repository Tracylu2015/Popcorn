package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/movie")
public class MovieController {

    @Autowired
    MovieService movieService;

    //get movie by its id
//    @GetMapping("/{id}")
//    public ResponseEntity<Movie> getOne(@PathVariable(value = "id") String id) {
//        Movie oneMovie = movieService.findMovieById(id);
//        return ResponseEntity.ok(oneMovie);
//    }

    @GetMapping("/{id}")
    public Movie getOne(@PathVariable("id") String id) {
        return movieService.findMovieById(id);
    }

    //get top 12 movies
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(value = "size", defaultValue = "30") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = movieService.getMovies(request);
        return getMapResponseEntity(page, movies);
    }

    //get movies by genres
    @GetMapping("/categories/{genres}")
    public List<Movie> getByGenres(@PathVariable("genres") String genres){
        ArrayList<String> newGen = new ArrayList<String>();
        newGen.add(genres);
        return movieService.getMoviesByGenres(newGen);
    }

    //get movies by language
    @GetMapping("/language/{language}")
    public List<Movie> getByLanguage(@PathVariable("language") String language){
        return movieService.getMoviesByLanguage(language);
    }

    //get 12 top score movies
    @GetMapping("/score")
    public ResponseEntity<Map<String, Object>> getAllAndSortByScore(
            @RequestParam(value = "size", defaultValue = "30") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = movieService.getMoviesByScoreDesc(request);
        return getMapResponseEntity(page, movies);
    }

    private ResponseEntity<Map<String, Object>> getMapResponseEntity(@RequestParam(value = "page", defaultValue = "0") int page, List<Movie> movies) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("movies", movies);
        resp.put("currentPage", page);
        resp.put("nextPage", page + 1);
        resp.put("totalSize", movies.size());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    //get movies by release year
    @GetMapping("/year/{year}")
    public List<Movie> getByYear(@PathVariable("year") int year){
        return movieService.getMoviesByStartYear(year);
    }
}
