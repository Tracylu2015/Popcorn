import json
import os

import requests
from bs4 import BeautifulSoup


import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["raw_comments_2"]


def scrape_comments():
    name = "json/movies-ids-20211217.json"

    count = 0
    with open(name) as fd:
        for midx, line in enumerate(fd):
            if midx <= 25157:
                continue
            meta = json.loads(line)
            movie_id = meta['_id']

            resp = requests.get('https://www.imdb.com/title/%s/reviews' % movie_id)
            soup = BeautifulSoup(resp.content, 'html.parser')
            comments = []
            for container in soup.find_all('div', {"class": "content"}):
                for text in container.find_all('div', {"class": "text"}):
                    comments.append(text.text)
            data = {
                "_id": movie_id,
                "comments": comments
            }

            mycol.insert_one(data)
            count += 1
            if count % 1000 == 0:
                print(count)
            if count == 40001:
                break


scrape_comments()
