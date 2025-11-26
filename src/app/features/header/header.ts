import { Component, inject } from '@angular/core';
import { MovieStore } from '../../core/stores/movie-store';
import { Route } from '../../core/route/route';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly route = inject(Route);
  public readonly moviesStore = inject(MovieStore);
  protected readonly search = this.moviesStore.search;

  protected searchMovies(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search.set(value);
  }

  protected navigateToMovies(): void {
    this.route.navigateToMovies();
  }
}
