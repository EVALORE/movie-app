import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../../shared/data-access/movie-api/movie-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotificationsService } from '../../shared/notifications/notifications-service';
import { catchError, tap, throwError } from 'rxjs';
import { Movie } from '../../shared/data-access/movie-api/movie';

@Injectable()
export class MovieStore {
  private readonly api = inject(MovieApi);
  private readonly notifications = inject(NotificationsService);

  public readonly movieId = signal('');

  public readonly movie = computed(() => this.movieResource.value());
  public readonly movieResource = rxResource({
    params: () => ({ movieId: this.movieId() }),
    stream: ({ params: { movieId } }) => {
      const response = this.api.getMovie(movieId);
      return response.pipe(
        catchError((error: unknown) => {
          this.notifications.show({ type: 'error', message: String(error) });
          return throwError(() => error);
        }),
        tap(() => {
          this.notifications.show({ type: 'success', message: 'Movie Info Loaded' });
        }),
      );
    },
    defaultValue: {} as Movie,
  });
}
