import json
import os

import requests
from bs4 import BeautifulSoup

import pymongo

myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["popcorn"]
mycol = mydb["raw_comments"]

def scrape_description():
    name = "json/movies-ids-20211217.json"

    with open(name) as fd:
        for midx, line in enumerate(fd):
            if midx < 19000:
                continue
            meta = json.loads(line)
            mID = meta['_id']
            resp = requests.get('https://www.imdb.com/title/%s/?ref_=vp_vi_tt' % mID)
            soup = BeautifulSoup(resp.content, 'html.parser')
            comments = []
            for container in soup.find_all('span', {"role": "presentation", "data-testid": "plot-xl"}):
                data = {
                    "_id": mID,
                    "description": container.text
                }
                comments.append(data)
            if midx % 1000 == 0:
                print(midx)
            mycol.insert_many(comments)

    # with open("description.json", "w") as f:
    #     json.dump(result, f)

scrape_description()
