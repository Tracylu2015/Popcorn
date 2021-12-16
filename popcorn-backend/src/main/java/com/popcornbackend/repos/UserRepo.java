package com.popcornbackend.repos;

import com.popcornbackend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepo extends MongoRepository<User, String> {

    User findByEmail(String email);
}
