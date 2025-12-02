import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { MovieApi } from '../../shared/data-access/movie-api/movie-api';
import { Movie, MoviesResponse } from '../../shared/data-access/movie-api/movie';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, tap, throwError } from 'rxjs';
import { NotificationsService } from '../../shared/notifications/notifications-service';
import { MOVIES_SEARCH } from '../../shared/tokens/movies-search-token';

@Injectable()
export class MoviesService {
  private readonly api = inject(MovieApi);
  private readonly notifications = inject(NotificationsService);

  private readonly search = inject(MOVIES_SEARCH);

  public readonly currentPage = linkedSignal(() => {
    this.search();
    return 1;
  });
  public readonly totalPages = computed(() => this.moviesResource.value().total_pages);

  public readonly movies = signal<Movie[]>([]);
  private readonly moviesResource = rxResource({
    params: () => ({ search: this.search(), page: this.currentPage() }),
    stream: ({ params: { search, page } }) => {
      const request = search
        ? this.api.getSearchMovies(search, page)
        : this.api.getPopularMovies(page);

      return request.pipe(
        tap((response) => {
          if (page === 1) {
            this.notifications.show({
              type: 'success',
              message: `found ${String(response.total_results)}`,
            });
            this.movies.set(response.results);
          } else {
            this.movies.update((current) => [...current, ...response.results]);
          }
        }),
        catchError((error: Error) => {
          this.notifications.show({ type: 'error', message: error.message });
          return throwError(() => error);
        }),
      );
    },
    defaultValue: {} as MoviesResponse,
  });

  public readonly isLoading = this.moviesResource.isLoading;
  public readonly canLoadMore = computed(
    () => !this.isLoading() && this.currentPage() < this.totalPages(),
  );

  public loadMoreMovies(): void {
    if (this.canLoadMore()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
