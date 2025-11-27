import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme } from './theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  providers: [Theme],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  protected readonly theme = inject(Theme);
}
