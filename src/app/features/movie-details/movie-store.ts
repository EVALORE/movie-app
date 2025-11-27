import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApi } from '../../core/api/movie-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable()
export class MovieStore {
  private readonly api = inject(MovieApi);

  public readonly movieId = signal('');

  public readonly movie = computed(() => this.movieResource.value());
  public readonly movieResource = rxResource({
    params: () => ({ movieId: this.movieId() }),
    stream: ({ params: { movieId } }) => this.api.getMovie(movieId),
  });
}
