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

    public List<Movie> findAllMovieContain(String query) {
        return movieRepo.findAllByPrimaryTitleContaining(query);
    }


    public List<Movie> getMovies(PageRequest request) {
        return movieRepo.findAll(request).getContent();
    }

    public List<Movie> getMoviesByGenres(List<String> genres){
        return movieRepo.findAllByGenres(genres);
    }

    public List<Movie> getMoviesByLanguage(String lan){
        return movieRepo.findAllByLanguage(lan);
    }

    public List<Movie> getMoviesByScoreDesc(PageRequest request) {
        return movieRepo.findAllByOrderByScoreDesc(request).getContent();
    }

    public List<Movie> getMoviesByStartYear(int year){
        return movieRepo.findAllByStartYear(year);
    }
}
