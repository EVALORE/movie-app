import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MovieStore } from '../../core/stores/movie-store';

@Component({
  selector: 'app-movie-details',
  imports: [NgOptimizedImage],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private readonly movieStore = inject(MovieStore);
  protected readonly movie = this.movieStore.movie;

  protected readonly posterPath = computed(
    () => `https://image.tmdb.org/t/p/w500${this.movie()?.poster_path ?? ''}`,
  );

  protected readonly title = computed(() => this.movie()?.title ?? '');
  protected readonly overview = computed(() => this.movie()?.overview ?? '');
  protected readonly releaseDate = computed(
    () => this.movie()?.release_date.replace(/-/gu, '.') ?? '',
  );
  protected readonly genres = computed(() => this.movie()?.genres ?? []);
  protected readonly voteAverage = computed(() => this.movie()?.vote_average ?? 0);
}
