import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rightbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightbar.component.html',
  styleUrl: './rightbar.component.scss',
})
export class RightbarComponent {
  navItems = [
    { name: 'About', target: 'about', icon: 'user' },
    { name: 'Home', target: 'hero', icon: 'home' },
    { name: 'Services', target: 'services', icon: 'briefcase' },
    { name: 'Portfolio', target: 'portfolio', icon: 'folder' },
    { name: 'Contact', target: 'contact', icon: 'mail' },
  ];

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
