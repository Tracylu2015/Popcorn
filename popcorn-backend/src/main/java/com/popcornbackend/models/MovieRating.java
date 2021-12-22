package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movieRatings")
@CompoundIndexes({
        @CompoundIndex(name = "userId_movieId", def = "{'userId' : 1, 'movieId': 1}",
                unique = true, background = true)
})
public class MovieRating {
    @Id
    private String id;

    private String userId;

    private String movieId;

    private int movieRatingScore;

    @Transient
    private User user;

    @Transient
    private Movie movie;

    public MovieRating() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getMovieRatingScore() {
        return movieRatingScore;
    }

    public void setMovieRatingScore(int movieRatingScore) {
        this.movieRatingScore = movieRatingScore;
    }
}
