import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  effect,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MOVIES_SEARCH } from '../../shared/tokens/movies-search-token';
import { Button } from '../../shared/ui/button';
import { THEME } from '../../shared/tokens/theme-token';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, Button],
  templateUrl: './header.html',
  host: { class: 'mx-auto flex h-16 max-w-7xl items-center gap-8' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly search = inject(MOVIES_SEARCH);
  private readonly document = inject(DOCUMENT).body;
  protected readonly theme = inject(THEME);

  protected readonly isDark = computed(() => this.theme() === 'dark');

  protected readonly input = new FormControl(this.search(), {
    nonNullable: true,
  });

  constructor() {
    effect(() => {
      this.document.setAttribute('data-theme', this.theme());
    });

    this.input.valueChanges.pipe(debounceTime(500), takeUntilDestroyed()).subscribe((value) => {
      this.search.set(value);
    });
  }
}
