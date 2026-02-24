import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  mobileMenuOpen = false;

  personalInfo = [
    { label: 'Age', value: '39' },
    { label: 'Residence', value: 'Bulgaria' },
    { label: 'Address', value: 'Ruse, Tulcha 8' },
  ];

  languages = [
    { name: 'Bulgarian', percent: 100 },
    { name: 'English', percent: 90 },
  ];

  skills = [
    { name: 'Angular', percent: 90 },
    { name: 'TypeScript', percent: 85 },
    { name: 'JavaScript', percent: 90 },
    { name: 'HTML/CSS', percent: 95 },
    { name: 'Node.js', percent: 75 },
  ];

  navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Contact', target: 'contact' },
  ];

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }
}
