import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MovieStore } from './movie-store';
import { MovieDetailsSkeleton } from './movie-details-skeleton/movie-details-skeleton';

@Component({
  selector: 'app-movie-details',
  imports: [NgOptimizedImage, MovieDetailsSkeleton],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  providers: [MovieStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails implements OnInit {
  private readonly movieStore = inject(MovieStore);
  public readonly id = input.required<string>();

  protected readonly movie = this.movieStore.movie;

  protected readonly posterPath = computed(
    () => `https://image.tmdb.org/t/p/w500${this.movie().poster_path}`,
  );

  public ngOnInit(): void {
    this.movieStore.movieId.set(this.id());
  }
}
