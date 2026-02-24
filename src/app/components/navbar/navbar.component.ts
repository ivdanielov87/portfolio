import { Component, inject, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  themeService = inject(ThemeService);
  private el = inject(ElementRef);
  mobileMenuOpen = false;
  private sidebarEl!: HTMLElement;

  ngAfterViewInit(): void {
    this.sidebarEl = this.el.nativeElement.querySelector('.sidebar');
    this.updateStickyTop();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateStickyTop();
  }

  private updateStickyTop(): void {
    if (!this.sidebarEl) return;
    const sidebarH = this.sidebarEl.offsetHeight;
    const viewportH = window.innerHeight;
    const margin = 24;

    if (sidebarH > viewportH - margin * 2) {
      this.sidebarEl.style.top = `${-(sidebarH - viewportH + margin)}px`;
    } else {
      this.sidebarEl.style.top = `${margin}px`;
    }
  }

  personalInfo = [
    { label: 'Age', value: '39' },
    { label: 'Residence', value: 'Bulgaria' },
    { label: 'Freelance', value: 'Available' },
    { label: 'Address', value: 'Ruse, Tulcha 8' },
  ];

  socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Website', url: '#', icon: 'link' },
  ];

  languages = [
    { name: 'Bulgarian', percent: 100 },
    { name: 'English', percent: 90 },
  ];

  skills = [
    { name: 'HTML', percent: 95 },
    { name: 'CSS', percent: 85 },
    { name: 'JavaScript', percent: 80 },
    { name: 'React', percent: 90 },
    { name: 'Angular', percent: 90 },
    { name: 'TypeScript', percent: 75 },
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
