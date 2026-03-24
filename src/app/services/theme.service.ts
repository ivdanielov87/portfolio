import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark: boolean = true;

  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDark = saved !== 'light';
    this.applyTheme(this.isDark);
  }

  get darkMode(): boolean {
    return this.isDark;
  }

  toggle(): void {
    this.isDark = !this.isDark;
    this.applyTheme(this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    const root = document.documentElement;
    const backgroundColor = isDark ? '#020617' : '#e5e7eb';
    const colorScheme = isDark ? 'dark' : 'light';

    root.classList.toggle('dark-theme', isDark);
    root.style.setProperty('--startup-bg', backgroundColor);
    root.style.backgroundColor = backgroundColor;
    root.style.colorScheme = colorScheme;

    document.body?.style.setProperty('background-color', backgroundColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', backgroundColor);
  }
}
