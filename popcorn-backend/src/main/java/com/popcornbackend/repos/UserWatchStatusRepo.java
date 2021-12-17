package com.popcornbackend.repos;


import com.popcornbackend.models.UserWatchStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWatchStatusRepo extends MongoRepository<UserWatchStatus, String> {
    List<UserWatchStatus> findAll();
}