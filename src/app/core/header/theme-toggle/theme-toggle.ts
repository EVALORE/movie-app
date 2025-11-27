import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme } from './theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  template: `
    <button
      (click)="theme.toggleDarkMode()"
      class="p-2 rounded-lg dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      <span>{{ theme.isDarkMode() ? '☀️' : '🌙' }}</span>
    </button>
  `,
  providers: [Theme],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  protected readonly theme = inject(Theme);
}
