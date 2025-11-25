import { Component, inject } from '@angular/core';
import { MovieStore } from './movie-store';
import { MovieCard } from './movie-card/movie-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  providers: [MovieStore],
})
export class MovieList {
  public readonly moviesStore = inject(MovieStore);
  public readonly router = inject(Router);

  protected readonly search = this.moviesStore.search;

  protected searchMovies(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search.set(value);
  }

  protected navigateToMovie(): void {
    void this.router.navigate(['/movie']);
  }
}
