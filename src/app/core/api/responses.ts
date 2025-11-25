export interface MoviesResponse {
  results: Movie[];
}


export interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  id: string;
  genres: {id: number, name: string}[];
  vote_average: number;
}
