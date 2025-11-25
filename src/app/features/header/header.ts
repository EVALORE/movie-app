import { Component, inject } from '@angular/core';
import { MovieStore } from '../../core/stores/movie-store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public readonly moviesStore = inject(MovieStore);
  protected readonly search = this.moviesStore.search;

  protected searchMovies(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search.set(value);
  }
}
