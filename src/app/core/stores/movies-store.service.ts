import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { NotificationStore } from '../modal/notification-store.service';
import { Movie } from '../api/responses';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MoviesStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly search = signal('');
  public readonly currentPage = signal(1);
  public readonly totalPages = signal(0);

  public readonly movies = signal<Movie[]>([]);
  private readonly moviesResource = rxResource({
    params: () => ({ search: this.search(), page: this.currentPage() }),
    stream: ({ params: { search, page } }) => {
      const request = search
        ? this.api.getSearchMovies(search, page)
        : this.api.getPopularMovies(page);

      return request.pipe(
        tap((response) => {
          this.totalPages.set(response.total_pages);

          if (page === 1) {
            this.movies.set(response.results);
            this.showResultNotification(response.total_results);
          } else {
            this.movies.update((current) => [...current, ...response.results]);
          }
        }),
      );
    },
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

  public setSearch(value: string): void {
    this.currentPage.set(1);
    this.search.set(value);
  }

  private showResultNotification(count: number): void {
    if (count === 0) {
      this.notificationStore.show('No movies found', 'error');
    } else {
      this.notificationStore.show(`Found ${String(count)} Movies`, 'success');
    }
  }
}
