import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Movie } from '../../../shared/data-access/movie-api/movie';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  host: {
    class:
      'flex border border-slate-700 dark:border-slate-300 shadow-md rounded-lg w-max overflow-hidden',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  public readonly movieInformation = input.required<Movie>();

  protected readonly title = computed(() => this.movieInformation().title);
  protected readonly posterPath = computed(
    () => `https://image.tmdb.org/t/p/w500${this.movieInformation().poster_path}`,
  );
  protected readonly overview = computed(() => this.movieInformation().overview);
}
