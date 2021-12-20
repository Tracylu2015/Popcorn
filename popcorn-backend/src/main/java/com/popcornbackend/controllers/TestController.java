package com.popcornbackend.controllers;

import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/")
public class TestController {

    @GetMapping("get")
    public String get(HttpSession session) {
        return session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME).toString();
    }

    @GetMapping("set")
    public String set(HttpSession session) {
        session.setAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, String.valueOf(System.currentTimeMillis()));
        return session.getId();
    }
}
