import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { Movie } from '../api/responses';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesStore {
  private readonly api = inject(MovieApi);

  public readonly search = signal('');
  public readonly currentPage = signal(1);
  public readonly totalPages = computed(() => this.moviesResource.value()?.total_pages ?? 1);

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
            this.movies.set(response.results);
          } else {
            this.movies.update((current) => [...current, ...response.results]);
          }
        }),
      );
    },
  });

  public readonly isLoading = this.moviesResource.isLoading;
  public readonly error = this.moviesResource.error;
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
