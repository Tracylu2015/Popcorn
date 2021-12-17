import csv
import json


def read_crew():
    name = 'tsvs/title.crew.tsv'
    result = []
    with open(name) as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):
            if index == 0:
                continue
            data = {
                "id": row[0],
                "directors": row[1].split(",")
            }
            result.append(data)
    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(result, f, indent=4, sort_keys=True)


read_crew()
