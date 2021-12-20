package com.popcornbackend.services;

import com.popcornbackend.models.RecommendationResponse;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    public static final String URL = "http://popcorn-recommand.spookyai.com:8888/api/recommend";

    public RecommendationResponse recommend(String... ids) {
        return recommend(Arrays.stream(ids).collect(Collectors.toList()));
    }

    public RecommendationResponse recommend(List<String> collect) {
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<List<String>> request = new HttpEntity<>(collect);
        /*
         * {
         *    "tt0268380": ["", ""]
         * }
         * */
        return restTemplate.postForObject(URL, request, RecommendationResponse.class);
    }
}
