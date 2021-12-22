package com.popcornbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userLikes")
@CompoundIndexes({
        @CompoundIndex(name = "userId_commentId", def = "{'userId' : 1, 'commentId': 1}",
                unique = true, background = true)
})
public class UserLike {
    @Id
    private String id;

    private String userId;

    private String commentId;

    public UserLike() {
    }

    public UserLike(String userId, String commentId) {
        this.userId = userId;
        this.commentId = commentId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
}
