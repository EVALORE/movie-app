import { Component, DestroyRef, inject } from '@angular/core';
import { MovieCard } from './movie-card/movie-card';
import { RouteService } from '../../core/services/route-service';
import { MoviesStore } from '../../core/stores/movies-store';
import { debounceTime, distinctUntilChanged, filter, map, Subject } from 'rxjs';
import { MovieCardSkeleton } from './movie-card/movie-card-skeleton/movie-card-skeleton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, MovieCardSkeleton],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  host: { '(window:scroll)': 'onScroll()' },
})
export class MovieList {
  public readonly moviesStore = inject(MoviesStore);
  public readonly route = inject(RouteService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollSubject = new Subject<void>();

  constructor() {
    this.scrollSubject
      .pipe(
        map(() => this.isNearBottom()),
        distinctUntilChanged(),
        debounceTime(1000),
        filter((isNearBottom) => isNearBottom && !this.moviesStore.isLoading()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.moviesStore.loadMoreMovies();
      });
  }

  public onScroll(): void {
    this.scrollSubject.next();
  }

  private isNearBottom(): boolean {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200;
    return scrollPosition >= documentHeight - threshold;
  }

  protected navigateToMovie(movieId: string): void {
    this.route.navigateToMovie(movieId);
  }
}
