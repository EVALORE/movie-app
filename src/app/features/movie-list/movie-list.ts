import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MovieCard } from './movie-card/movie-card';
import { MoviesStore } from './movies-store';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { MovieCardSkeleton } from './movie-card/movie-card-skeleton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { InfiniteScroll } from '../../shared/directives/infinite-scroll';
import { Repeat } from '../../shared/directives/repeat';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, MovieCardSkeleton, InfiniteScroll, Repeat],
  templateUrl: './movie-list.html',
  providers: [MoviesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  public readonly moviesStore = inject(MoviesStore);
  public readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSubject = new Subject<void>();

  constructor() {
    this.scrollSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter(() => !this.moviesStore.isLoading()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.moviesStore.loadMoreMovies();
      });
  }

  public onScroll(): void {
    console.log('scroll');
    this.scrollSubject.next();
  }

  protected navigateToMovie(movieId: string): void {
    void this.router.navigate(['movie', movieId]);
  }
}
