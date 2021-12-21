package com.popcornbackend.models;

import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;


@Document(collection = "comments")
public class Comment {
    @Id
    private String id;

    private String userId;

    private String movieId;

    private int totalLikes;

    private String post;

    private int score;

    @Transient
    private boolean likeStatus;

    @Transient
    private User user;

    @Transient
    private Movie movie;

    @CreatedDate
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private DateTime created;

    @LastModifiedDate
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private DateTime modified;

    public Comment() {
    }

    public Comment( String userId, String movieId, int totalLikes, String post, int score) {

        this.userId = userId;
        this.movieId = movieId;
        this.totalLikes = totalLikes;
        this.post = post;
        this.score = score;
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

    public int getTotalLikes() {
        return totalLikes;
    }

    public void setTotalLikes(int totalLikes) {
        this.totalLikes = totalLikes;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public DateTime getCreated() {
        return created;
    }

    public void setCreated(DateTime created) {
        this.created = created;
    }

    public DateTime getModified() {
        return modified;
    }

    public void setModified(DateTime modified) {
        this.modified = modified;
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

    public boolean isLikeStatus() {
        return likeStatus;
    }

    public void setLikeStatus(boolean likeStatus) {
        this.likeStatus = likeStatus;
    }
}
