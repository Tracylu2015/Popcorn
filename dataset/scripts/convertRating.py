import csv
import json
import pprint


def read_title_ratings():
    name = 'tsvs/title.ratings.tsv'
    result = []
    with open(name) as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):

            if index == 0:
                continue
            print(row)
            if len(row) != 3:
                continue

            data = {
                "id": row[0],
                "score": row[1],
                "numOfVotes": row[2]
            }
            result.append(data)

    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(result, f, indent=4, sort_keys=True)


read_title_ratings()
