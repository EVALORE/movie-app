import { Injectable, signal } from '@angular/core';

@Injectable()
export class Theme {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';
  private readonly THEME_ATTRIBUTE = 'data-theme';

  public isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update((value) => !value);
    this.applyTheme(this.isDarkMode());
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.setAttribute(this.THEME_ATTRIBUTE, this.DARK_THEME);
      localStorage.setItem(this.THEME_KEY, this.DARK_THEME);
    } else {
      document.documentElement.removeAttribute(this.THEME_ATTRIBUTE);
      localStorage.setItem(this.THEME_KEY, this.LIGHT_THEME);
    }
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === this.DARK_THEME;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
