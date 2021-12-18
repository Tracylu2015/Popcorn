package com.popcornbackend.controllers;

import com.popcornbackend.models.User;
import com.popcornbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;




@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/api/user/register")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("/api/user/login")
    public User loginUser(@RequestBody String username){
        User loginUser = userService.findUser(username);
        return loginUser;
    }

}
