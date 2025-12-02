import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchParams } from '../services/search-params.service';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [ThemeToggle, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  host: { class: 'mx-auto flex h-16 max-w-7xl items-center gap-8' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly searchParams = inject(SearchParams);
  protected readonly search = new FormControl(this.searchParams.search(), {
    nonNullable: true,
  });

  constructor() {
    this.search.valueChanges.pipe(debounceTime(500), takeUntilDestroyed()).subscribe((value) => {
      this.searchParams.search.set(value);
    });
  }
}
