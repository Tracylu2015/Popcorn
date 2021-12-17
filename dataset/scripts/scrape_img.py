import json
import time
from pprint import pprint

import requests
from bs4 import BeautifulSoup


# tt0438097 is a movie id

def run_img():
    name = "json/movie-ids.json"
    with open(name) as fd:
        myJson = json.load(fd)

    count = 0
    result = []
    for m_id in myJson:
        count += 1
        if count <= 10000:
            continue
        resp = requests.get('https://www.imdb.com/title/%s/' % m_id)
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
            m_id: links
        }
        result.append(data)
        print(count)
        if count > 20000:
            break

    with open("image_2.json", "w") as f:
        json.dump(result, f)


    # Sleep 1 second to prevent rate limit
    time.sleep(1)


run_img()
