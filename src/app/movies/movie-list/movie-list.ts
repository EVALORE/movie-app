import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieCard } from './movie-card/movie-card';
import { MoviesService } from './movies-service';
import { filter, Subject, throttleTime } from 'rxjs';
import { MovieCardSkeleton } from './movie-card/movie-card-skeleton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ScrollSentinel } from '../../shared/directives/scroll-sentinel';
import { Repeat } from '../../shared/directives/repeat';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, MovieCardSkeleton, ScrollSentinel, Repeat],
  templateUrl: './movie-list.html',
  providers: [MoviesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  public readonly moviesStore = inject(MoviesService);
  public readonly router = inject(Router);
  private readonly scrollSubject = new Subject<void>();

  constructor() {
    this.scrollSubject
      .pipe(
        throttleTime(1000),
        filter(() => !this.moviesStore.isLoading()),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.moviesStore.loadMoreMovies();
      });
  }

  public onScroll(): void {
    this.scrollSubject.next();
  }

  protected navigateToMovie(movieId: string): void {
    void this.router.navigate(['movie', movieId]);
  }
}
