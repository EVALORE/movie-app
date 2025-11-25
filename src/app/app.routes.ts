import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    title: 'Movies',
    loadComponent: () =>
      import('./features/movie-list/movie-list').then((component) => component.MovieList),
  },
  {
    path: 'movie',
    title: 'Movie Details',
    loadComponent: () =>
      import('./features/movie-details/movie-details').then((component) => component.MovieDetails),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
