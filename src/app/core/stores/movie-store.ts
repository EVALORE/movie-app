import { inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, of, switchMap } from 'rxjs';
import { NotificationStore } from '../modal/notification-store.service';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly movieId = signal('');
  public readonly movie = toSignal(
    toObservable(this.movieId).pipe(
      filter((movieId) => movieId !== ''),
      switchMap((movieId) => this.api.getMovie(movieId)),
      catchError(() => {
        this.notificationStore.show('Movie not found', 'error');
        return of();
      }),
    ),
  );
}
