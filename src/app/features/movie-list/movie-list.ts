import { Component, DestroyRef, inject } from '@angular/core';
import { MovieCard } from './movie-card/movie-card';
import { Route } from '../../core/route/route';
import { MoviesStore } from '../../core/stores/movies-store';
import { MovieStore } from '../../core/stores/movie-store';
import { Subject } from 'rxjs';
import { MovieCardSkeleton } from './movie-card/movie-card-skeleton/movie-card-skeleton';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, MovieCardSkeleton],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  // host: { '(window:scroll)': 'onScroll()' },
})
export class MovieList {
  public readonly moviesStore = inject(MoviesStore);
  public readonly movieStore = inject(MovieStore);
  public readonly route = inject(Route);
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollSubject = new Subject<void>();

  // constructor() {
  //   this.scrollSubject
  //     .pipe(
  //       map(() => this.isNearBottom()),
  //       distinctUntilChanged(),
  //       debounceTime(1000),
  //       takeUntilDestroyed(this.destroyRef),
  //     )
  //     .subscribe((isNearBottom) => {
  //       if (isNearBottom && !this.moviesStore.isLoading()) {
  //         this.moviesStore.loadMoreMovies();
  //       }
  //     });
  // }
  //
  // public onScroll(): void {
  //   this.scrollSubject.next();
  // }
  //
  // private isNearBottom(): boolean {
  //   const scrollPosition = window.innerHeight + window.scrollY;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   const threshold = 200;
  //   return scrollPosition >= documentHeight - threshold;
  // }

  protected navigateToMovie(movieId: string): void {
    this.movieStore.movieId.set(movieId);
    this.route.navigateToMovie(movieId);
  }
}
