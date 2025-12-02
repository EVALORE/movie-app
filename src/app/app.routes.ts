import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    title: 'Movies',
    loadComponent: () =>
      import('./movies/movie-list/movie-list').then((component) => component.MovieList),
  },
  {
    path: 'movie/:id',
    title: 'Movie Details',
    loadComponent: () =>
      import('./movies/movie-details/movie-details').then((component) => component.MovieDetails),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
