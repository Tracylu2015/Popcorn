import json

import requests
from bs4 import BeautifulSoup


def scrape_description():
    result = []
    name = "json/movies-ids-20211217-1.json"

    thisId = "tt0438097"
    count = 0
    with open(name) as fd:
        my_ids = json.load(fd)
        for mID in my_ids:
            movie_id = mID

            resp = requests.get('https://www.imdb.com/title/%s' % thisId)
            soup = BeautifulSoup(resp.content, 'html.parser')
            comments = []
            for container in soup.find_all('span', {"class": "GenresAndPlot__TextContainerBreakpointXL-cum89p-2"}):
                # for text in container.find_all('div', {"class": "text"}):
                print(container)
        #         data = {
        #             "_id": movie_id,
        #             "comments": comments
        #         }
        #
        #         result.append(data)
        #         count += 1
        #         if count % 1000 == 0:
        #             print(count)
        #         if count == 20001:
        #             break
        #
        # with open("comments.json", "w") as f:
        #     json.dump(result, f)

    scrape_description()
