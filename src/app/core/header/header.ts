import { Component, DestroyRef, inject } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchParams } from '../services/search-params.service';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public readonly searchParams = inject(SearchParams);
  public readonly input = new FormControl('', { nonNullable: true });

  constructor() {
    this.input.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((value) => {
        this.searchParams.search.set(value);
      });
  }
}
