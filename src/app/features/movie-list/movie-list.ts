import { Component, inject } from '@angular/core';
import { MovieApi } from '../../core/api/movie-api';
import { MovieCard } from './movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  public readonly moviesApi = inject(MovieApi);
}
