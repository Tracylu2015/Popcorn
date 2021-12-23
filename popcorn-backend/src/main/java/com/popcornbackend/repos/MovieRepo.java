package com.popcornbackend.repos;

import com.popcornbackend.models.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepo extends MongoRepository<Movie, String> {
    //find all movies
    List<Movie> findAll();

    //find all movies which primary title contain the query
    Page<Movie> findAllByPrimaryTitleContaining(String query, Pageable pageable);

    //find one movie by its id
    Optional<Movie> findById(String id);

    //override findall and pass pageable
    Page<Movie> findAll(Pageable pageable);

    //find all movies which primary title contain the query and sort by score descending order
    Page<Movie> findAllByPrimaryTitleOrderByScoreDesc(String query, Pageable pageable);


    Page<Movie> findAllByScoreGreaterThan(float score, Pageable pageable);


    Page<Movie> findAllByGenres(List<String> genre, Pageable pageable);

    Page<Movie> findAllByGenresAndStartYearLessThanEqual(List<String> genre, int year, Pageable pageable);

    Page<Movie> findAllByOrderByScoreDesc(Pageable pageable);

    Page<Movie> findAllByOrderByNumOfVotesDesc(Pageable pageable);

    long countAllByPrimaryTitleContaining(String primaryTitle);

    Page<Movie> findAllByStartYearLessThanOrderByScoreDesc(int currentYear, PageRequest request);
}
