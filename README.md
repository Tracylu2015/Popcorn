# Popcorn

## Schema

Movie {
    retrieve from API;
    year:
    actors;
    directors;
    description
    title;
    movieRating (PG13)
    categories;
    id;
    coverImage;
    language;
    duration;
    releaseDate;
    totalScore;
    totalRatingCount;
    trialUrl;
}

user {
    id;
    email;
    username;
    password;
    avatar;
  }

  userWatchStatus {
    id;
    user_id
    movie_id
    status (watched/toWatch)
  }


comment {
    id;
    user_id;
    movie_id;
    total_like;(default 0)
    msg (can be empty);
    scores(1-5)
}

userLikes {
  id;
  user_id;
  comment_id;
}

