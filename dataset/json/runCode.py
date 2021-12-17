import json
import time
from pprint import pprint

import requests
from bs4 import BeautifulSoup

def get_url():
# tt0438097 is a movie id
    resultList = []
    name = "dataset/json/movie-ids.json"
    with open(name) as fd:
        url01 = json.load(fd)
        counter = 0
        for ele in url01:
            resp = requests.get('https://www.imdb.com/title/%s/' % ele)
            soup = BeautifulSoup(resp.content, 'html.parser')
            links = []
            for container in soup.find_all('img', {"class": "ipc-image", 'srcset': True}):
                for srcset in container['srcset'].split(', '):
                    segments = srcset.split(' ')
                    link = segments[0]
                    size = segments[1]
                    links.append(link)
                break
            data = {
                ele: links
            }
            counter += 1
            if counter == 10000:
                break
            print(ele)
            resultList.append(data)

    with open("image", "w") as f:
        json.dump(resultList, f)
get_url()

# Sleep 1 second to prevent rate limit
# time.sleep(1)