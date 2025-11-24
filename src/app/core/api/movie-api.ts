import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  success: boolean;
}

interface MoviesResponse {
  results: unknown[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieApi {
  public readonly apiKey = signal<string>('');

  private readonly auth = httpResource<AuthResponse>(() =>
    this.createRequest(`${environment.baseUrl}/authentication`),
  );

  private readonly moviesResource = httpResource<MoviesResponse>(() =>
    this.createRequest(`${environment.baseUrl}/movie/popular`),
  );

  public readonly movies = computed(() => this.moviesResource.value());

  public setApiKey(key: string): void {
    this.apiKey.set(key);
  }

  private createRequest(url: string): { url: string; headers: Record<string, string> } | undefined {
    const key = this.apiKey();

    if (!key.trim()) {
      return;
    }

    return {
      url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${key}`,
      },
    };
  }
}
