import json
import os

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["movies"]



def find_and_update():
    name = "json/directors"

    with open('json/movie-ids.json') as f:
        movies = json.load(f)
    movies = set(movies)

    with open(name) as fd:
        importJson = json.load(fd)
        for ele in importJson:
            doc_id = ele["id"]
            if doc_id not in movies:
                continue
            ele["directors"] = list(ele["directors"])
            x = mycol.find_one({"_id": doc_id})

            if not x:
                continue
            del ele["id"]
            mycol.find_one_and_update({"_id": doc_id}, {"$set": ele})

find_and_update()
