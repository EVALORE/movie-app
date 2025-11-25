import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MoviesResponse } from './responses';

@Injectable({
  providedIn: 'root',
})
export class MovieApi {
  public readonly apiKey = signal<string>('');

  private readonly moviesResource = httpResource<MoviesResponse>(
    () => `${environment.baseUrl}/movie/popular`,
  );

  public readonly movies = computed(() => this.moviesResource.value());

  public setApiKey(key: string): void {
    this.apiKey.set(key);
  }
}
