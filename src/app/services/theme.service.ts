import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark: boolean = true;

  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDark = saved !== 'light';

    if (this.isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  get darkMode(): boolean {
    return this.isDark;
  }

  toggle(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
