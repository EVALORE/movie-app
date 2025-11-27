import { Component, inject } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { MoviesStore } from '../stores/movies-store';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public readonly moviesStore = inject(MoviesStore);
  public readonly input = new FormControl('', { nonNullable: true });

  constructor() {
    this.input.valueChanges
      .pipe(
        debounceTime(500),
        filter((value) => value.trim().length !== 0),
      )
      .subscribe((value) => {
        this.moviesStore.setSearch(value);
      });
  }
}
