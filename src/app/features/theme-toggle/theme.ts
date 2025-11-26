import { Injectable, signal } from '@angular/core';

@Injectable()
export class Theme {
  public isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkMode.set(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update((value) => !value);
    if (this.isDarkMode()) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
