package com.popcornbackend.services;

import com.popcornbackend.models.User;
import com.popcornbackend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException{
        User user = userRepo.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("User not found!");
        }
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("user"));
        return (UserDetails) new User(user.getUsername(), user.getPassword(), authorities);
    }
}