import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from './features/movie-list/movie-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
