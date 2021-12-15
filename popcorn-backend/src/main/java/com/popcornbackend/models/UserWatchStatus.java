package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watchStatus")
public class UserWatchStatus {

    @Id
    private String id;

    private String userId;

    private String movieId;

    private String status;

    public UserWatchStatus() {
    }

    public UserWatchStatus(String userId, String movieId, String status) {
        this.userId = userId;
        this.movieId = movieId;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
