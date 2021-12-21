package com.popcornbackend.controllers;

import com.popcornbackend.models.Movie;
import com.popcornbackend.models.RecommendationResponse;
import com.popcornbackend.models.UserWatchStatus;
import com.popcornbackend.services.MovieService;
import com.popcornbackend.services.RecommendationService;
import com.popcornbackend.services.WatchService;
import com.popcornbackend.utils.Collections;
import com.popcornbackend.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    public static final int MAX_PAGE_COUNT = 30;
    public static final PageRequest DEFAULT_PAGE_REQUEST = PageRequest.of(0, 20);

    @Autowired
    MovieService movieService;
    @Autowired
    WatchService watchService;
    @Autowired
    RecommendationService recommendationService;

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
        long maxPage = movieService.count() / size;
        return ResponseUtil.getMapResponseEntity(page, maxPage, movies);
    }

    //get movies by genres
    @GetMapping("/categories/{genres}")
    public ResponseEntity<Map<String, Object>> getByGenres(
            @PathVariable("genres") String genres,
            @RequestParam(value = "sort", defaultValue = "startYear") String sort,
            @RequestParam(value = "size", defaultValue = "18") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Movie> movies = movieService.getMoviesByGenres(Collections.of(genres), request);
        long maxPage = movieService.count() / size;
        return ResponseUtil.getMapResponseEntity(page, maxPage, movies);
    }

    //Route for search bar
    //Get All movie by search query
    @GetMapping("/search/{query}/{genres}")
    public ResponseEntity<Map<String, Object>> getByGenres(
            @PathVariable("query") String query,
            @PathVariable("genres") String genres,
            @RequestParam(value = "sort", defaultValue = "year") String sort,
            @RequestParam(value = "size", defaultValue = "18") int size,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        PageRequest request = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Movie> movies = movieService.getMoviesByGenresAndTitle(Collections.of(genres), query, request);
        long maxPage = movieService.countByGenresAndTitle(Collections.of(genres), query) / size;
        return ResponseUtil.getMapResponseEntity(page, maxPage, movies);
    }

    @GetMapping("/recommend")
    public List<Movie> recommendMovies(HttpSession session) {
        //get userId
        String userId = (String) session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME);
        //find user watchlist according to userID
        List<UserWatchStatus> watchlist = watchService.findList(userId, UserWatchStatus.STATUS_WATCHED, DEFAULT_PAGE_REQUEST);
        if (Collections.isEmpty(watchlist)) {
            List<UserWatchStatus> wishList = watchService.findList(userId, UserWatchStatus.STATUS_WISH, DEFAULT_PAGE_REQUEST);
            if (Collections.isEmpty(wishList)) {
                return movieService.getMoviesByScoreDesc(PageRequest.of(0, 12));
            }
        }
        List<String> movieIdList = new ArrayList<>();
        for (UserWatchStatus userWatchStatus : watchlist) {
            String mId = userWatchStatus.getMovieId();
            movieIdList.add(mId);
            if (movieIdList.size() >= 10) {
                break;
            }
        }
        // get recommend movie list by movie id
        RecommendationResponse myRoc = recommendationService.recommend(movieIdList);
        //
//        RecommendationResponse recommend = recommendationService.recommend("tt0268380", "tt");
        List<Movie> recommendMovies = new ArrayList<>();
        for (String mid : myRoc.keySet()) {
            recommendMovies.addAll(movieService.findMovieByIds(myRoc.get(mid)));
//            System.out.println(mid);
//            System.out.println(myRoc.get(mid));
        }
        recommendMovies.stream().sorted((m1, m2) -> m1.getNumOfVotes() - m2.getNumOfVotes() > 0 ? 1 : m1.getNumOfVotes() == m2.getNumOfVotes() ? 0 : -1).limit(24);
        return recommendMovies;
    }
}
