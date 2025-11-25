import { inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../../core/api/movie-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Injectable()
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
}
