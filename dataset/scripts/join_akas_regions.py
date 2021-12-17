import json


def join_files(name):
    with open('json/movie-ids.json') as f:
        movies = json.load(f)
    movies = set(movies)
    with open(name) as fd:
        # read json file
        result = {}
        arr = json.load(fd)
        for index, ele in enumerate(arr):
            # find key = "id"
            mid = ele["id"]
            if mid not in movies:
                continue

            # if not in the {}, put in
            if mid not in result:
                result[mid] = ele
            # if "regions" not in this key, create an empty array
            if 'regions' not in result[mid]:
                result[mid]['regions'] = []
            # ignore "\\N"
            if ele['region'] != '\\N':
                result[mid]['regions'].append(ele['region'])
                result[mid]['regions'] = list(set(result[mid]['regions']))
            # if "region" already in the array, delete the same value
            if 'region' in result[mid]:
                del result[mid]['region']
        return result


result = join_files('json/title.akas.json')
with open('json/title.akas-joined.json', 'w') as f:
    json.dump(list(result.values()), f)
