package com.popcornbackend.repos;

import com.popcornbackend.models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepo extends MongoRepository<Movie, String> {
    //find all movies
    List<Movie> findAll();

    //find all movies which primary title contain the query
    List<Movie> findAllByPrimaryTitleContaining(String query);

    //find one movie by its id
    Movie findBy_id(String id);

    //find all movies which primary title contain the query and sort by score descending order
    List<Movie> findAllByPrimaryTitleOrderByScoreDesc(String query);

    Movie findBy_idAndLanguage(String id, String lan);



}
