import json
import time
from pprint import pprint

import requests
from bs4 import BeautifulSoup

# tt0438097 is a movie id
movie_id = 'tt0438096'
resp = requests.get('https://www.imdb.com/title/%s/' % movie_id)
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
    movie_id: links
}

print(data)

# Sleep 1 second to prevent rate limit
time.sleep(1)
