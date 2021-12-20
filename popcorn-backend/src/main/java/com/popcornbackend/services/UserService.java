package com.popcornbackend.services;

import com.popcornbackend.models.User;
import com.popcornbackend.repos.UserRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User findById(ObjectId id) {
        return userRepo.findById(id).orElse(null);
    }

    public User findById(String id) {
        return userRepo.findById(new ObjectId(id)).orElse(null);
    }

    public User editUser(User user) {
        return userRepo.save(user);
    }
}
