import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MoviesResponse } from './responses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieApi {
  private readonly http = inject(HttpClient);
  public readonly apiKey = signal('');

  public getPopularMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${environment.baseUrl}/movie/popular`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }

  public getSearchMovies(query: string): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${environment.baseUrl}/search/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${environment.apiKey}`,
      },
      params: { query },
    });
  }
}
