import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { MovieApi } from '../../core/api/movie-api';
import { Movie, MoviesResponse } from '../../core/api/responses';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, tap, throwError } from 'rxjs';
import { NotificationsService } from '../../shared/notifications/notifications-service';
import { SearchParams } from '../../core/services/search-params.service';

@Injectable()
export class MoviesStore {
  private readonly api = inject(MovieApi);
  private readonly notifications = inject(NotificationsService);
  private readonly searchParams = inject(SearchParams);

  public readonly currentPage = linkedSignal(() => {
    this.searchParams.search();
    return 1;
  });
  public readonly totalPages = computed(() => this.moviesResource.value().total_pages);

  public readonly movies = signal<Movie[]>([]);
  private readonly moviesResource = rxResource({
    params: () => ({ search: this.searchParams.search(), page: this.currentPage() }),
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
        catchError((error: unknown) => {
          this.notifications.show({ type: 'error', message: String(error) });
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
