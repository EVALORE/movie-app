import { Component, inject } from '@angular/core';
import { MovieStore } from '../../core/stores/movie-store';
import { MovieCard } from './movie-card/movie-card';
import { Route } from '../../core/route/route';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  public readonly moviesStore = inject(MovieStore);
  public readonly route = inject(Route);

  protected navigateToMovie(movieId: string): void {
    this.moviesStore.movieId.set(movieId);
    this.route.navigateToMovie();
  }
}
