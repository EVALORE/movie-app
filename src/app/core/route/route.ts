import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Route {
  private readonly router = inject(Router);

  public navigateToMovies(): void {
    void this.router.navigate(['/movies']);
  }

  public navigateToMovie(movieId: string): void {
    void this.router.navigate(['movie', movieId]);
  }
}
