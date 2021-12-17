import json
import os

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["movies"]


def read_title_and_import():
    name = "json/image"

    with open(name) as fd:
        importJson = json.load(fd)
        myList = []
        for ele in importJson:
            if ele["startYear"] < 2000:
                continue
            ele['_id'] = ele['id']
            del ele['id']
            myList.append(ele)
            if len(myList) > 1000:
                mycol.insert_many(myList)
                myList = []

        if len(myList) != 0:
            mycol.insert_many(myList)


def find_and_update():
    name = "json/title.akas-joined.json"

    with open(name) as fd:
        importJson = json.load(fd)
        for ele in importJson:
            doc_id = ele["id"]
            x = mycol.find_one({"_id": doc_id})

            if not x:
                continue
            if ele["language"] == "\\N":
                ele["language"] = ""
            del ele["id"]
            mycol.find_one_and_update({"_id": doc_id}, {"$set": ele})

find_and_update()

