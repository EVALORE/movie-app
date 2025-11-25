export interface MoviesResponse {
  results: Movie[];
}


export interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  id: string;
}
