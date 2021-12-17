import csv
import json
import pprint


def read_title_basics():
    tvEpisodeCount = 0
    name = 'tsvs/title.basics.tsv'
    data_array = []
    with open(name) as fd:
        # read csv file
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        for index, row in enumerate(rd):
            if index == 0:
                continue
            if row[1] == 'tvEpisode':
                tvEpisodeCount += 1
                continue
            if len(row) != 9:
                pprint.pprint(row)
                continue

            data = {
                'id': row[0],
                'titleType': row[1],
                'primaryTitle': row[2],
                'originalTitle': row[3],
                'startYear': int(row[5].replace('\\N', '0')),
                'runtimeMinutes': row[7].replace('\\N', '0'),
                'genres': row[8].split(',')
            }
            data_array.append(data)
    with open(name.replace('.tsv', '.json'), 'w') as f:
        json.dump(data_array, f, indent=4, sort_keys=True)
    print('Total tvEpisodeCount:', tvEpisodeCount)


read_title_basics()
