package com.popcornbackend.repos;

import com.popcornbackend.models.Movie;
import org.springframework.data.domain.Page;
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
    List<Movie> findAllByPrimaryTitleContaining(String query);

    //find one movie by its id
    Optional<Movie> findById(String id);

    Page<Movie> findAll(Pageable pageable);


    //find all movies which primary title contain the query and sort by score descending order
    Page<Movie> findAllByPrimaryTitleOrderByScoreDesc(String query, Pageable pageable);

    List<Movie> findAllByLanguage(String lan);

    List<Movie> findAllByScoreGreaterThan(float score);

    List<Movie> findAllByStartYear(int year);

    List<Movie> findAllByGenres(List<String> genre);

    Page<Movie> findAllByOrderByScoreDesc(Pageable pageable);


}
