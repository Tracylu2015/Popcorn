package com.popcornbackend.repos;

import com.popcornbackend.models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepo extends MongoRepository<Movie, String> {
    List<Movie> findAll();
}
