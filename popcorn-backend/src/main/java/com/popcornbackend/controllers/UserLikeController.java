package com.popcornbackend.controllers;

import com.popcornbackend.models.Comment;
import com.popcornbackend.models.User;
import com.popcornbackend.models.UserLike;
import com.popcornbackend.services.CommentService;
import com.popcornbackend.services.UserLikeService;
import com.popcornbackend.services.UserService;
import com.popcornbackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
@RequestMapping("/api/userLike")
public class UserLikeController {
    @Autowired
    UserLikeService userLikeService;
    @Autowired
    CommentService commentService;
    @Autowired
    UserService userService;

    //add like and update number of likes
    @PostMapping("/addLike")
    public Comment addLike(@RequestBody HashMap<String, String> body, HttpSession session) {
        String userId = UserUtil.getUserId(session);
        String commentId = body.get("commentId");
        Comment comment = commentService.findCommentById(commentId);
        User user = userService.findById(comment.getUserId());
        comment.setUser(user);
        comment.setPost(comment.getPost());
        String likeStatus = body.get("like_status");
        if ("true".equals(likeStatus)) {
            comment.setTotalLikes(comment.getTotalLikes() + 1);
            comment.setLikeStatus(true);
            UserLike userLike = new UserLike();
            userLike.setUserId(userId);
            userLike.setCommentId(commentId);

            userLikeService.createOne(userLike);
        } else {
            // remove like and decrease number of likes, set status to false
            comment.setTotalLikes(comment.getTotalLikes() - 1);
            comment.setLikeStatus(false);
            userLikeService.deleteOne(userId, commentId);
        }

        return commentService.updateOne(comment);
    }
}
