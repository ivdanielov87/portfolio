import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rightbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightbar.component.html',
  styleUrl: './rightbar.component.scss',
})
export class RightbarComponent implements OnInit, OnDestroy {
  navItems = [
    { name: 'Home', target: 'hero', icon: 'home' },
    { name: 'About', target: 'about', icon: 'user' },
    { name: 'Services', target: 'services', icon: 'briefcase' },
    { name: 'Portfolio', target: 'portfolio', icon: 'folder' },
    { name: 'Contact', target: 'contact', icon: 'mail' },
  ];

  activeSection = 'hero';
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      this.navItems.forEach((item) => {
        const el = document.getElementById(item.target);
        if (el) this.observer!.observe(el);
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
