package com.popcornbackend.repos;


import com.popcornbackend.models.MovieRating;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieRatingRepo extends MongoRepository<MovieRating, String> {

    MovieRating findMovieRatingByUserIdAndMovieId(String userId, String movieId);
}
