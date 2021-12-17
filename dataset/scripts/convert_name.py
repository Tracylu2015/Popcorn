import csv
import json


def read_name():
    name = 'tsvs/name.basics.tsv'
    result = []
    with open(name) as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):
            if index == 0:
                continue
            if row[1] == "":
                continue
            if row[4] == "":
                continue
            data = {
                row[0]: row[1],
                "position": row[4],
            }
            result.append(data)
        print(data)
    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(result, f)


read_name()
