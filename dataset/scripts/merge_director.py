import json


def get_directors():
    crewFile = "json/title.crew.json"
    personNamesFile = "json/name.basics.json"

    result =[]
    names = {}
    with open(personNamesFile) as fd:
        myJson1 = json.load(fd)
        for index, data in enumerate(myJson1):
            for k, v in data.items():
                if k.startswith('nm'):
                    names[k] = v
                    break

    with open(crewFile) as fd:
        myJson2 = json.load(fd)
        for ele in myJson2:
            directors = []
            for director in ele['directors']:
                directorName = names.get(director)
                if directorName is None:
                    continue
                directors.append(directorName)

            ele["directors"] = directors
            result.append(ele)

    with open("directors", "w") as f:
        json.dump(result, f)


get_directors()
