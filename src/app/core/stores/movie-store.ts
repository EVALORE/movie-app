import { inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../api/movie-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { NotificationStore } from '../modal/notification-store.service';
import { Movie } from '../api/responses';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  private readonly api = inject(MovieApi);
  private readonly notificationStore = inject(NotificationStore);

  public readonly search = signal('');
  public readonly currentPage = signal(1);
  public readonly totalPages = signal(0);
  public readonly isLoading = signal(false);

  public readonly movies = signal<Movie[]>([]);

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

  constructor() {
    toObservable(this.search)
      .pipe(
        tap(() => {
          this.currentPage.set(1);
          this.isLoading.set(true);
        }),
        switchMap((search) =>
          search ? this.api.getSearchMovies(search, 1) : this.api.getPopularMovies(1),
        ),
        tap((response) => {
          this.isLoading.set(false);
          this.totalPages.set(response.total_pages);
          this.movies.set(response.results);
          if (response.results.length === 0) {
            this.notificationStore.show('No movies found', 'error');
          } else {
            this.notificationStore.show(`Found ${String(response.results.length)}`, 'success');
          }
        }),
      )
      .subscribe();
  }

  public loadMoreMovies(): void {
    if (this.isLoading() || this.currentPage() >= this.totalPages()) {
      return;
    }

    const nextPage = this.currentPage() + 1;
    this.isLoading.set(true);

    const request = this.search()
      ? this.api.getSearchMovies(this.search(), nextPage)
      : this.api.getPopularMovies(nextPage);

    request.subscribe({
      next: (response) => {
        const currentMovies = this.movies();
        this.movies.set([...currentMovies, ...response.results]);
        this.currentPage.set(nextPage);
        this.isLoading.set(false);
      },
      error: () => {
        this.notificationStore.show('Failed to load more movies', 'error');
        this.isLoading.set(false);
      },
    });
  }
}
