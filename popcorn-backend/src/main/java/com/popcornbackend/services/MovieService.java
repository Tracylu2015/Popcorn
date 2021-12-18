package com.popcornbackend.services;

import com.popcornbackend.models.Movie;
import com.popcornbackend.repos.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    MovieRepo movieRepo;

    public List<Movie> findAllMovies() {
        return movieRepo.findAll();
    }

    public Movie findMovieById(String id) {
        Optional<Movie> movie = movieRepo.findById(id);
        return movie.orElse(null);
    }

    List<Movie> findAllMovieContain(String query) {
        return movieRepo.findAllByPrimaryTitleContaining(query);
    }

    List<Movie> findAllMovieContainAndSortByScoreDesc(String query) {
        return movieRepo.findAllByPrimaryTitleOrderByScoreDesc(query);
    }

    public List<Movie> getMovies(PageRequest request) {
        return movieRepo.findAll(request).getContent();
    }
}
