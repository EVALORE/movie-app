import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movie-list/movie-list').then((component) => component.MovieList),
  },
  {
    path: 'movie',
    loadComponent: () =>
      import('./features/movie-details/movie-details').then((component) => component.MovieDetails),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
