package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "movies")

public class Movie {
    @Id
    private String id;

    private String primaryTitle;

    private int startYear;

    private List<String> directors;

    private List<String> regions;

    private List<String> genres;

    @Field("img_url")
    private String imageUrl;

    private String language;

    private int runtimeMinutes;

    private float score;

    private String description;

    private int numOfVotes;

    @Field("video_url")
    private String videoUrl;

    @Transient
    private String watchStatus;

    @Transient
    private int movieRatingScore;

    public Movie() {
    }

    public Movie(String id, String primaryTitle, int startYear, List<String> directors, List<String> regions,
                 List<String> genres, String imageUrl, String language, int runtimeMinutes, float score,
                 String description, int numOfVotes, String videoUrl) {
        this.id = id;
        this.primaryTitle = primaryTitle;
        this.startYear = startYear;
        this.directors = directors;
        this.regions = regions;
        this.genres = genres;
        this.imageUrl = imageUrl;
        this.language = language;
        this.runtimeMinutes = runtimeMinutes;
        this.score = score;
        this.description = description;
        this.numOfVotes = numOfVotes;
        this.videoUrl = videoUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrimaryTitle() {
        return primaryTitle;
    }

    public void setPrimaryTitle(String primaryTitle) {
        this.primaryTitle = primaryTitle;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public List<String> getDirectors() {
        return directors;
    }

    public void setDirectors(List<String> directors) {
        this.directors = directors;
    }

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getRuntimeMinutes() {
        return runtimeMinutes;
    }

    public void setRuntimeMinutes(int runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumOfVotes() {
        return numOfVotes;
    }

    public void setNumOfVotes(int numOfVotes) {
        this.numOfVotes = numOfVotes;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getWatchStatus() {
        return watchStatus;
    }

    public void setWatchStatus(String watchStatus) {
        this.watchStatus = watchStatus;
    }

    public int getMovieRatingScore() {
        return movieRatingScore;
    }

    public void setMovieRatingScore(int movieRatingScore) {
        this.movieRatingScore = movieRatingScore;
    }
}
