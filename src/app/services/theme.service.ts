import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = true;

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      this.isDark = false;
      document.documentElement.classList.add('light-theme');
    }
  }

  get darkMode(): boolean {
    return this.isDark;
  }

  toggle(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
