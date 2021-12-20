package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watchStatus")
@CompoundIndexes({
        @CompoundIndex(name = "userId_movieId_status", def = "{'userId' : 1, 'movieId': 1, 'status': 1}",
                unique = true, background = true)
})
public class UserWatchStatus {
    public static final String STATUS_WISH = "wish";
    public static final String STATUS_WATCHED = "watched";
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
