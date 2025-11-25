import { inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs';
import { NotificationStore } from '../modal/notification-store.service';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly search = signal('');
  public readonly movies = toSignal(
    toObservable(this.search).pipe(
      switchMap((search) =>
        search ? this.api.getSearchMovies(search) : this.api.getPopularMovies(),
      ),
      tap((response) => {
        if (response.results.length === 0) {
          this.notificationStore.show('No movies found', 'error');
        } else {
          this.notificationStore.show(`Found ${String(response.results.length)}`, 'success');
        }
      }),
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
