import json
import os

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["movies"]


def insert_img():
    name = "json/image09.json"
    with open(name) as fd:
        my_img = json.load(fd)
        for data in my_img:
            for key,value in data.items():
                x = mycol.find_one({"_id": key})

                if not x:
                    continue
                if not value:
                    continue
                mycol.find_one_and_update({"_id": key}, {"$set": {"img_url": value[-1]}})

insert_img()
