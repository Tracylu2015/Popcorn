import json

import requests
from bs4 import BeautifulSoup


def scrape_comments():
    result = []
    name = "json/movies-ids-20211217-1.json"

    count = 0
    with open(name) as fd:
        my_ids = json.load(fd)
        for mID in my_ids:
            movie_id = mID

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

            result.append(data)
            count += 1
            if count % 1000 == 0:
                print(count)
            if count == 20001:
                break

    with open("comments.json", "w") as f:
        json.dump(result, f)


scrape_comments()
