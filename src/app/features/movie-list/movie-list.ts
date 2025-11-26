import { Component, DestroyRef, inject } from '@angular/core';
import { MovieCard } from './movie-card/movie-card';
import { Route } from '../../core/route/route';
import { MoviesStore } from '../../core/stores/movies-store';
import { MovieStore } from '../../core/stores/movie-store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  host: { '(window:scroll)': 'onScroll()' },
})
export class MovieList {
  public readonly moviesStore = inject(MoviesStore);
  public readonly movieStore = inject(MovieStore);
  public readonly route = inject(Route);
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollSubject = new Subject<void>();

  constructor() {
    this.scrollSubject
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkAndLoadMore();
      });
  }

  public onScroll(): void {
    this.scrollSubject.next();
  }

  private checkAndLoadMore(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200;

    if (scrollPosition >= documentHeight - threshold && !this.moviesStore.isLoading()) {
      this.moviesStore.loadMoreMovies();
    }
  }

  protected navigateToMovie(movieId: string): void {
    this.movieStore.movieId.set(movieId);
    this.route.navigateToMovie(movieId);
  }
}
