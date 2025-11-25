import { Component, inject } from '@angular/core';
import { MovieStore } from './movie-store';
import { MovieCard } from './movie-card/movie-card';
import { MovieApi } from '../../core/api/movie-api';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  providers: [MovieStore],
})
export class MovieList {
  public readonly moviesStore = inject(MovieStore);
  private readonly moviesApi = inject(MovieApi);

  protected readonly apiKey = this.moviesApi.apiKey;
  protected readonly search = this.moviesStore.search;

  protected searchMovies(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search.set(value);
  }

  protected setApiKey(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.apiKey.set(value);
  }
}
