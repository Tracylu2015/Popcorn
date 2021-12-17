import json


def movie_ids():
    name = "json/title.basics.json"
    ids = []
    with open(name) as fd:
        importJson = json.load(fd)
        for ele in importJson:
            if ele["startYear"] < 2000:
                continue
            ids.append(ele['id'])
    with open('json/movie-ids.json', 'w') as f:
        json.dump(ids, f)

movie_ids()