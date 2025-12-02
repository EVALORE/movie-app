import { effect, inject, InjectionToken, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from '../data-access/storage/local-storage';

export type ThemeToken = 'dark' | 'light';

const THEME_KEY = 'theme';
const DEFAULT_THEME: ThemeToken = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

interface ThemeSignal extends WritableSignal<ThemeToken> {
  toggle: () => void;
}

export const THEME = new InjectionToken('THEME', {
  providedIn: 'root',
  factory: (): ThemeSignal => {
    const storage = inject(LocalStorageService);

    const theme = storage.getItem(THEME_KEY, DEFAULT_THEME);

    const themeSignal = signal<ThemeToken>(theme);

    effect(() => {
      storage.setItem(THEME_KEY, themeSignal());
    });

    return Object.assign(themeSignal, {
      toggle: () => {
        themeSignal.update((current) => (current === 'dark' ? 'light' : 'dark'));
      },
    });
  },
});
