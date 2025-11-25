import { Component, inject } from '@angular/core';
import { MovieStore } from '../../core/stores/movie-store';
import { MovieCard } from './movie-card/movie-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  public readonly moviesStore = inject(MovieStore);
  public readonly router = inject(Router);

  protected navigateToMovie(movieId: string): void {
    this.moviesStore.movieId.set(movieId);
    void this.router.navigate(['/movie']);
  }
}
