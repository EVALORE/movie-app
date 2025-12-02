export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  id: string;
  genres: { id: number; name: string }[];
  vote_average: number;
}
