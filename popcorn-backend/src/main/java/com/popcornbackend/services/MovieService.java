package com.popcornbackend.services;

import com.popcornbackend.models.Movie;
import com.popcornbackend.repos.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    public static final int CURRENT_YEAR = 2021;
    @Autowired
    MovieRepo movieRepo;

    public List<Movie> findAllMovies() {
        return movieRepo.findAll();
    }

    public Movie findMovieById(String id) {
        Optional<Movie> movie = movieRepo.findById(id);
        return movie.orElse(null);
    }

    public List<Movie> findAllMovieContain(String query, PageRequest request) {
        return movieRepo.findAllByPrimaryTitleContaining(query, request).getContent();
    }

    public List<Movie> getMovies(PageRequest request) {
        return movieRepo.findAllByOrderByNumOfVotesDesc(request).getContent();
    }

    public List<Movie> getMoviesByGenres(List<String> genres, PageRequest request) {
        return movieRepo.findAllByGenresAndStartYearLessThanEqual(genres, CURRENT_YEAR, request).getContent();
    }

    public List<Movie> getMoviesByGenresAndTitle(List<String> genres, String query, PageRequest request) {
        return movieRepo.findAllByGenresAndPrimaryTitleContaining(genres, query, request).getContent();
    }

    public List<Movie> getMoviesByLanguage(String lan, PageRequest request) {
        return movieRepo.findAllByLanguage(lan, request).getContent();
    }

    public List<Movie> getMoviesByScoreDesc(PageRequest request) {
        return movieRepo.findAllByOrderByScoreDesc(request).getContent();
    }

    public List<Movie> getMoviesByStartYear(int year, PageRequest request){
        return movieRepo.findAllByStartYear(year, request).getContent();
    }

    public List<Movie> getMoviesByVotesDesc(PageRequest request) {
        return movieRepo.findAllByOrderByNumOfVotesDesc(request).getContent();
    }

    public List<Movie> findMovieByIds(List<String> mids) {
        List<Movie> result = new ArrayList<>();
        movieRepo.findAllById(mids).forEach(result::add);
        return result;
    }

    public long count() {
        return movieRepo.count();
    }

    public long countByGenresAndTitle(List<String> genres, String query) {
        return movieRepo.countAllByGenresAndPrimaryTitleContaining(genres, query);
    }
}
