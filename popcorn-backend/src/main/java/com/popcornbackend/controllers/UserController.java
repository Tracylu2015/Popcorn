package com.popcornbackend.controllers;

import com.popcornbackend.models.User;
import com.popcornbackend.services.UserService;
import org.bson.types.ObjectId;
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
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        User currentUser = userService.findUser(user.getEmail());
        if (currentUser != null) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Email already Exists");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }

//        if(!currentUser.getPassword().equals(user.getPassword())){
//            Map<String, Object> resp = new HashMap<>();
//            resp.put("error", "Password does not match");
//            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
//        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createUser(user);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
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

    @PutMapping("/edit/{user}")
    public ResponseEntity<Object> editUser(@PathVariable User user){
        User currentUser = userService.findUser(user.getEmail());
        if (currentUser != null) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.editUser(user);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

}
