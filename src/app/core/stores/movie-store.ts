import { inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  private readonly api = inject(MovieApi);

  public readonly search = signal('');
  public readonly movies = toSignal(
    toObservable(this.search).pipe(
      switchMap((search) =>
        search ? this.api.getSearchMovies(search) : this.api.getPopularMovies(),
      ),
      map((response) => response.results),
    ),
    { initialValue: [] },
  );

  public readonly movieId = signal('');
  public readonly movie = toSignal(
    toObservable(this.movieId).pipe(
      filter((movieId) => movieId !== ''),
      switchMap((movieId) => this.api.getMovie(movieId)),
    ),
  );
}
