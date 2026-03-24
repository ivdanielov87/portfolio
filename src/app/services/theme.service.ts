import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private static readonly palettes = {
    light: {
      '--bg-page': '#e5e7eb',
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8f9fa',
      '--bg-sidebar': '#111827',
      '--bg-card': '#ffffff',
      '--bg-card-hover': '#f3f4f6',
      '--bg-input': '#ffffff',
      '--text-primary': '#111827',
      '--text-secondary': '#4b5563',
      '--text-muted': '#9ca3af',
      '--accent-primary': '#eab308',
      '--accent-hover': '#ca8a04',
      '--accent-light': 'rgba(234, 179, 8, 0.1)',
      '--border-color': '#e5e7eb',
      '--border-light': '#d1d5db',
      '--tag-bg': '#f3f4f6',
      '--tag-text': '#374151',
      '--sidebar-text': '#e5e7eb',
      '--sidebar-muted': '#9ca3af',
      '--sidebar-border': '#1f2937',
      '--sidebar-accent': '#eab308',
      '--right-bar-bg': '#111827',
      '--right-bar-icon': '#9ca3af',
      '--right-bar-icon-hover': '#eab308',
    },
    dark: {
      '--bg-page': '#020617',
      '--bg-primary': '#0f172a',
      '--bg-secondary': '#1e293b',
      '--bg-sidebar': '#0f172a',
      '--bg-card': '#1e293b',
      '--bg-card-hover': '#334155',
      '--bg-input': '#1e293b',
      '--text-primary': '#f1f5f9',
      '--text-secondary': '#94a3b8',
      '--text-muted': '#64748b',
      '--accent-primary': '#eab308',
      '--accent-hover': '#ca8a04',
      '--accent-light': 'rgba(234, 179, 8, 0.15)',
      '--border-color': '#334155',
      '--border-light': '#475569',
      '--tag-bg': '#334155',
      '--tag-text': '#e2e8f0',
      '--sidebar-text': '#e2e8f0',
      '--sidebar-muted': '#94a3b8',
      '--sidebar-border': '#1e293b',
      '--sidebar-accent': '#eab308',
      '--right-bar-bg': '#1e293b',
      '--right-bar-icon': '#94a3b8',
      '--right-bar-icon-hover': '#eab308',
    },
  } as const;

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
    const palette = isDark ? ThemeService.palettes.dark : ThemeService.palettes.light;
    const backgroundColor = isDark ? '#020617' : '#e5e7eb';
    const colorScheme = isDark ? 'dark' : 'light';

    root.classList.toggle('dark-theme', isDark);
    Object.entries(palette).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
    root.style.setProperty('--startup-bg', backgroundColor);
    root.style.backgroundColor = backgroundColor;
    root.style.colorScheme = colorScheme;

    document.body?.style.setProperty('background-color', backgroundColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', backgroundColor);
  }
}
