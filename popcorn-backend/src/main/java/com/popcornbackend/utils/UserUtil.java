package com.popcornbackend.utils;


import com.popcornbackend.models.User;
import org.springframework.session.FindByIndexNameSessionRepository;

import javax.servlet.http.HttpSession;

public class UserUtil {
    public static String getUserId(HttpSession session){
        String userId = (String) session.getAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME);
        return userId;
    }

    public static void setUserId(HttpSession session, User user){
        session.setAttribute(
                FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, user.getId().toHexString());
    }
}
