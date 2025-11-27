import { Component, inject } from '@angular/core';
import { RouteService } from '../services/route-service';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { MoviesStore } from '../stores/movies-store';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly route = inject(RouteService);
  public readonly moviesStore = inject(MoviesStore);
  protected readonly search = this.moviesStore.search;

  protected searchMovies(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.moviesStore.setSearch(value);
  }

  protected navigateToMovies(): void {
    this.route.navigateToMovies();
  }
}
