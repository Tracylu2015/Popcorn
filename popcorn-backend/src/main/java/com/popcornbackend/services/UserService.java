package com.popcornbackend.services;

import com.popcornbackend.models.User;
import com.popcornbackend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User findUser(String username) {
        return userRepo.findByUsername(username);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
