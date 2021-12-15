package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "movies")
public class Movie {
    @Id
    private String id;

    private String title;

    private int year;

    private List<String> actors;

    private List<String> directors;

    private String image;

    private List<String> language;

    private int duration;

    private Date releaseDate;

    private String movieRating;

    private List<String> categories;

    private String description;

    private int totalScore;

    private int totalRatingCount;

    private String trialUrl;

    public Movie() {
    }

    public Movie(String title, int year, List<String> actors, List<String> directors, String image,
                 List<String> language, int duration, Date releaseDate, String movieRating,
                 List<String> categories, String description, int totalScore, int totalRatingCount,String trialUrl) {
        this.title = title;
        this.year = year;
        this.actors = actors;
        this.directors = directors;
        this.image = image;
        this.language = language;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.movieRating = movieRating;
        this.categories = categories;
        this.description = description;
        this.totalScore = totalScore;
        this.totalRatingCount = totalRatingCount;
        this.trialUrl=trialUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public List<String> getDirectors() {
        return directors;
    }

    public void setDirectors(List<String> directors) {
        this.directors = directors;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getLanguage() {
        return language;
    }

    public void setLanguage(List<String> language) {
        this.language = language;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getMovieRating() {
        return movieRating;
    }

    public void setMovieRating(String movieRating) {
        this.movieRating = movieRating;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public int getTotalRatingCount() {
        return totalRatingCount;
    }

    public void setTotalRatingCount(int totalRatingCount) {
        this.totalRatingCount = totalRatingCount;
    }

    public String getTrialUrl() {
        return trialUrl;
    }

    public void setTrialUrl(String trialUrl) {
        this.trialUrl = trialUrl;
    }
}
