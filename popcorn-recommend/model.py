import os

from annoy import AnnoyIndex


class RecommendModel:
    DIM = 274

    def __init__(self) -> None:
        super().__init__()
        self.t = AnnoyIndex(self.DIM, 'angular')  # Length of item vector that will be indexed
        self.t.load(os.getenv("MODEL_PATH", 'models/movie.ann'))
        self.movieToIdx = {}
        self.idxToMovie = {}
        with open(os.getenv("MAPPING_PATH", 'models/mapping.csv')) as f:
            for line in f:
                if not line:
                    continue
                segments = line.strip().split(',')
                self.movieToIdx[segments[0]] = segments[1]
                self.idxToMovie[segments[1]] = segments[0]

    def find_near_movie(self, movie_ids, n_nearest=6):
        results = {}
        for movie_id in movie_ids:
            index = self.movieToIdx.get(movie_id)
            if not index:
                return []
            items = self.t.get_nns_by_item(int(index), n_nearest)

            results[movie_id] = [self.idxToMovie.get(str(item), "") for item in items]
        return results
