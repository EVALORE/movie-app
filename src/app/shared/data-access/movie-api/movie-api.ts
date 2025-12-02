import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Movie, MoviesResponse } from './movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieApi {
  private readonly http = inject(HttpClient);

  public getPopularMovies(page: number): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${environment.baseUrl}/movie/popular`, {
      params: { page: String(page) },
    });
  }

  public getSearchMovies(query: string, page: number): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${environment.baseUrl}/search/movie`, {
      params: { query, page: String(page) },
    });
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${environment.baseUrl}/movie/${movieId}`);
  }
}
