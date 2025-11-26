import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { NotificationStore } from '../modal/notification-store';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly movieId = signal('');
  public readonly movie = computed(() => this.movieResource.value());
  public readonly movieResource = rxResource({
    params: () => ({ movieId: this.movieId() }),
    stream: ({ params: { movieId } }) => {
      if (!movieId) {
        return of();
      }

      return this.api.getMovie(movieId).pipe(
        catchError(() => {
          this.notificationStore.show('Movie not found', 'error');
          return of();
        }),
      );
    },
  });
}
