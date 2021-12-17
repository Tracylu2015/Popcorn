import sys
import csv
import json

csv.field_size_limit(sys.maxsize)


def read_title_akas():
    name = 'tsvs/title.akas.tsv'
    result = []
    with open(name) as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):
            if len(row) != 8:
                continue
            data = {
                "id": row[0],
                "title": row[2],
                "region": row[3],
                "language": row[4].replace('\\N', '')
            }
            result.append(data)
    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(result, f)


read_title_akas()
