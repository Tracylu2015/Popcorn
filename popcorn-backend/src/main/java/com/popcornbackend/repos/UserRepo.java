package com.popcornbackend.repos;

import com.popcornbackend.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);

}
