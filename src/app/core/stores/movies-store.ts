import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { NotificationStore } from '../modal/notification-store';
import { Movie } from '../api/responses';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly search = signal('');
  public readonly currentPage = signal(1);
  public readonly totalPages = computed(() => this.moviesResource.value()?.total_pages ?? 1);

  private readonly debouncedSearch = toObservable(this.search).pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  private readonly moviesResource = rxResource({
    params: () => ({ search: this.search(), page: this.currentPage() }),
    stream: ({ params: { search, page } }) => {
      if (!search) {
        return this.api.getPopularMovies(page).pipe(
          catchError(() => {
            this.notificationStore.show('Failed to load movies', 'error');
            return of();
          }),
        );
      }

      return this.debouncedSearch.pipe(
        switchMap(() => this.api.getSearchMovies(search, page)),
        catchError(() => {
          this.notificationStore.show('Failed to load movies', 'error');
          return of();
        }),
      );
    },
  });

  public readonly movies = linkedSignal<{ results: Movie[] | undefined; search: string }, Movie[]>({
    source: () => ({
      results: this.moviesResource.value()?.results,
      search: this.search(),
    }),
    computation: ({ results, search }, previous) => {
      const isNewSearch = previous?.source.search !== search;
      const previousMovies = isNewSearch ? [] : previous.value;
      return [...previousMovies, ...(results ?? [])];
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
}
