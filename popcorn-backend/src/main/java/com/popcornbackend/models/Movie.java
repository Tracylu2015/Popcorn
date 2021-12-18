package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "movies")
public class Movie {
    @Id
    private String _id;

    private String primaryTitle;

    private int startYear;

    private List<String> directors;

    private List<String> regions;

    private List<String> genres;

    private String image_url;

    private String language;

    private int runtimeMinutes;

    private float score;

    private String description;

    private int numOfVotes;

    private String video_url;

    public Movie() {
    }

    public Movie(String _id, String primaryTitle, int startYear, List<String> directors, List<String> regions,
                 List<String> genres, String image_url, String language, int runtimeMinutes, float score,
                 String description, int numOfVotes, String video_url) {
        this._id = _id;
        this.primaryTitle = primaryTitle;
        this.startYear = startYear;
        this.directors = directors;
        this.regions = regions;
        this.genres = genres;
        this.image_url = image_url;
        this.language = language;
        this.runtimeMinutes = runtimeMinutes;
        this.score = score;
        this.description = description;
        this.numOfVotes = numOfVotes;
        this.video_url = video_url;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
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

    public String getVideo_url() {
        return video_url;
    }

    public void setVideo_url(String video_url) {
        this.video_url = video_url;
    }
}
