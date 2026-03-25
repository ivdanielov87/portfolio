import { Injectable } from '@angular/core';

const startupThemeVars = [
  '--bg-page',
  '--bg-primary',
  '--bg-secondary',
  '--bg-card',
  '--text-primary',
  '--text-secondary',
  '--text-muted',
  '--accent-primary',
  '--accent-hover',
  '--accent-light',
] as const;

const themeStorageKey = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark: boolean = true;

  constructor() {
    this.isDark = this.readStoredTheme() !== 'light';
    this.applyTheme(this.isDark);
  }

  get darkMode(): boolean {
    return this.isDark;
  }

  toggle(): void {
    this.isDark = !this.isDark;
    this.applyTheme(this.isDark);
    this.writeStoredTheme(this.isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    const root = document.documentElement;
    const backgroundColor = isDark ? '#020617' : '#e5e7eb';
    const colorScheme = isDark ? 'dark' : 'light';

    root.classList.toggle('dark-theme', isDark);
    this.clearStartupThemeOverrides(root);
    root.style.setProperty('--startup-bg', backgroundColor);
    root.style.backgroundColor = backgroundColor;
    root.style.colorScheme = colorScheme;

    document.body?.style.setProperty('background-color', backgroundColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', backgroundColor);
  }

  private clearStartupThemeOverrides(root: HTMLElement): void {
    startupThemeVars.forEach((name) => {
      root.style.removeProperty(name);
    });
  }

  private readStoredTheme(): string | null {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch {
      return null;
    }
  }

  private writeStoredTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // Ignore storage failures and keep the theme in memory.
    }
  }
}
