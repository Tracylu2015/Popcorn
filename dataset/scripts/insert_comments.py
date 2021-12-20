import datetime
import os
import random

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["raw_comments_2"]
commentsCol = mydb["comments"]


users = []
# find all users in db collection
for user in mydb["users"].find():
    users.append(str(user["_id"]))

# find all movies with comments
for movie in mycol.find():
    mid = movie["_id"]
    result = []
    for comment in movie["comments"]:
        data = {
            "movieId": mid,
            "userId": random.choice(users),
            "post": comment,
            "created": datetime.datetime.utcnow(),
            "modified": datetime.datetime.utcnow()
        }
        result.append(data)
    if result:
        commentsCol.insert_many(result)