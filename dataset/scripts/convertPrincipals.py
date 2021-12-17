import csv
import json


def read_principals():
    name = 'tsvs/title.principals.tsv'
    result = []
    with open(name) as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):
            if index == 0:
                continue

            data = {
                "id": row[0],
                "personId": row[2],
                "jobCategory": row[3],
                "job": row[4],
                "character": row[5]
            }
            result.append(data)
    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(result, f, indent=4, sort_keys=True)


read_principals()
