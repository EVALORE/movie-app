import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieApi } from './core/api/movie-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly api = inject(MovieApi);
  protected readonly apiKey = this.api.apiKey;

  constructor() {
    effect(() => {
      console.log(this.api.movies());
    });
  }

  public onApiKeyChange(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.api.setApiKey(value);
  }
}
