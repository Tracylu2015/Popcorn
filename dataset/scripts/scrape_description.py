import json

import requests
from bs4 import BeautifulSoup


def scrape_description():
    result = []
    name = "json/movies-ids-20211217-1.json"

    with open(name) as fd:
        my_ids = json.load(fd)
        for mID in my_ids:

            resp = requests.get('https://www.imdb.com/title/%s/?ref_=vp_vi_tt' % mID)
            soup = BeautifulSoup(resp.content, 'html.parser')
            comments = []
            for container in soup.find_all('span', {"role": "presentation", "data-testid": "plot-xl"}):
                data = {
                    "_id": mID,
                    "description": container.text
                }
                result.append(data)

    with open("description.json", "w") as f:
        json.dump(result, f)

scrape_description()
