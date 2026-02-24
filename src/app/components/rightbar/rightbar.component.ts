import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-rightbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightbar.component.html',
  styleUrl: './rightbar.component.scss',
})
export class RightbarComponent {
  navItems = [
    { name: 'Home', target: 'hero', icon: 'home' },
    { name: 'Services', target: 'services', icon: 'briefcase' },
    { name: 'About', target: 'about', icon: 'user' },
    { name: 'Portfolio', target: 'portfolio', icon: 'folder' },
    { name: 'Contact', target: 'contact', icon: 'mail' },
  ];

  activeSection = 'hero';

  constructor(public themeService: ThemeService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    // If scrolled to bottom of page, activate last section (contact)
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
      this.activeSection = this.navItems[this.navItems.length - 1].target;
      return;
    }

    const scrollY = window.scrollY + 200;
    for (let i = this.navItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.navItems[i].target);
      if (el && el.offsetTop <= scrollY) {
        this.activeSection = this.navItems[i].target;
        return;
      }
    }
    this.activeSection = 'hero';
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
