package com.popcornbackend.controllers;

import com.popcornbackend.models.User;
import com.popcornbackend.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@RequestBody User user, HttpSession session) {
        User currentUser = userService.findByEmail(user.getEmail());
        if (currentUser != null) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Email already Exists");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.createUser(user);
        session.setAttribute(
                FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, newUser.getId().toHexString());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user, HttpSession session) {
        User currentUser = userService.findByEmail(user.getEmail());
        if (currentUser != null) {
            if (passwordEncoder.matches(user.getPassword(), currentUser.getPassword())) {
                session.setAttribute(
                        FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, currentUser.getId().toHexString());
                return new ResponseEntity<>(currentUser, HttpStatus.OK);
            }
        }
        Map<String, Object> resp = new HashMap<>();
        resp.put("error", "Password mismatch or user not found");
        return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
    }

    @GetMapping("/findOne/{id}")
    public User findOne(@PathVariable("id") String id) {
        return userService.findById(id);
    }


    //edit user info
    @PutMapping("/edit")
    public ResponseEntity<Object> editUser(@RequestBody User user) {
        ObjectId id = user.getId();
        User currentUser = userService.findById(id);
        if (currentUser == null) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "User not Found");
            return new ResponseEntity<>(resp, HttpStatus.FORBIDDEN);
        }
        currentUser.setEmail(user.getEmail());
        currentUser.setUsername(user.getUsername());
        User updatedUser = userService.editUser(currentUser);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    //logout
    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
