package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.WatchService;
import com.popcornbackend.utils.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    MovieService movieService;
    @Autowired
    WatchService watchService;


    @GetMapping("/{id}")
    public Movie getOne(@PathVariable("id") String id, HttpSession session) {
        String userId = (String) session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME);
        return watchService.updateMovieStatus(userId, movieService.findMovieById(id));
    }

    //get top 12 movies
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            HttpSession session
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = movieService.getMovies(request);

//        String userId = (String) session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME);
//        System.out.println(userId);
        return getMapResponseEntity(page, movies);
    }

    //get movies by genres
    @GetMapping("/categories/{genres}")
    public List<Movie> getByGenres(
            @PathVariable("genres") String genres,
            @RequestParam(value = "sort", defaultValue = "year") String sort,
            @RequestParam(value = "size", defaultValue = "30") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        return movieService.getMoviesByGenres(Collections.of(genres), request);
    }

    //get movies by language
    @GetMapping("/language/{language}")
    public ResponseEntity<Map<String, Object>> getAllByLanguage(
            @PathVariable("language") String language,
            @RequestParam(value = "size", defaultValue = "30") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size);
        List<Movie> movies = movieService.getMoviesByLanguage(language, request);
        return getMapResponseEntity(page, movies);
    }

//    //get 30 top score movies
//    @GetMapping("/score")
//    public ResponseEntity<Map<String, Object>> getAllAndSortByScore(
//            @RequestParam(value = "size", defaultValue = "30") int size,
//            @RequestParam(value = "page", defaultValue = "0") int page
//    ) {
//        PageRequest request = PageRequest.of(page, size);
//        List<Movie> movies = movieService.getMoviesByScoreDesc(request);
//        return getMapResponseEntity(page, movies);
//    }
//
//    //get 30 top Vote movies
//    @GetMapping("/vote")
//    public ResponseEntity<Map<String, Object>> getAllAndSortByVote(
//            @RequestParam(value = "size", defaultValue = "30") int size,
//            @RequestParam(value = "page", defaultValue = "0") int page
//    ) {
//        PageRequest request = PageRequest.of(page, size);
//        List<Movie> movies = movieService.getMoviesByVotesDesc(request);
//        return getMapResponseEntity(page, movies);
//    }

//    //get 30 movies by release year
//    @GetMapping("/year/{year}")
//    public ResponseEntity<Map<String, Object>> getAllByStartYear(
//            @PathVariable("year") int year,
//            @RequestParam(value = "size", defaultValue = "30") int size,
//            @RequestParam(value = "page", defaultValue = "0") int page
//    ) {
//        PageRequest request = PageRequest.of(page, size);
//        List<Movie> movies = movieService.getMoviesByStartYear(year, request);
//        return getMapResponseEntity(page, movies);
//    }

    //public function of each get movie route
    private ResponseEntity<Map<String, Object>> getMapResponseEntity(@RequestParam(value = "page", defaultValue = "0") int page, List<Movie> movies) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("movies", movies);
        resp.put("currentPage", page);
        resp.put("nextPage", page + 1);
        resp.put("totalSize", movies.size());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    //Route for search bar
    //Get All movie by search query
    @GetMapping("/search/{query}/{genres}")
    public List<Movie> getByGenres(
            @PathVariable("query") String query,
            @PathVariable("genres") String genres,
            @RequestParam(value = "sort", defaultValue = "year") String sort,
            @RequestParam(value = "size", defaultValue = "30") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        return movieService.getMoviesByGenresAndTitle(Collections.of(genres), query,request);
    }


}
