package com.popcornbackend.controllers;

import com.popcornbackend.models.User;
import com.popcornbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        User currentUser = userService.findUser(user.getEmail());
        if (currentUser != null) {
            if (passwordEncoder.matches(user.getPassword(), currentUser.getPassword())) {
                return new ResponseEntity<>(currentUser, HttpStatus.OK);
            }
        }
        Map<String, Object> resp = new HashMap<>();
        resp.put("error", "Password mismatch or user not found");
        return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
    }
}
