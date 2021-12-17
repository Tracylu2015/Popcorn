import json
import os

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["movies"]


def find_and_update():
    with open('json/movie-ids.json') as f:
        movies = json.load(f)
    movies = set(movies)

    name = "json/title.ratings.json"

    with open(name) as fd:
        importJson = json.load(fd)
        for ele in importJson:
            doc_id = ele["id"]
            if doc_id not in movies:
                continue
            ele["score"] = float(ele["score"])
            ele["numOfVotes"] = int(ele["numOfVotes"])
            x = mycol.find_one({"_id": doc_id})

            if not x:
                continue
            del ele["id"]
            mycol.find_one_and_update({"_id": doc_id}, {"$set": ele})

find_and_update()