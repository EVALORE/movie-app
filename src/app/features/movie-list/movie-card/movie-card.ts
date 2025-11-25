import { Component, computed, input } from '@angular/core';
import { Movie } from '../../../core/api/responses';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  public readonly movieInformation = input.required<Movie>();

  protected readonly title = computed(() => this.movieInformation().title);
  protected readonly posterPath = computed(
    () => `https://image.tmdb.org/t/p/w500${this.movieInformation().poster_path}`,
  );
  protected readonly overview = computed(() => this.movieInformation().overview);
}
