import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { getActiveSection, scrollToSection, type SectionLink } from '../../utils/scroll.utils';

type RightbarSectionTarget = 'hero' | 'services' | 'about' | 'portfolio' | 'contact';

interface NavItem extends SectionLink<RightbarSectionTarget> {
  name: string;
  icon: 'home' | 'briefcase' | 'user' | 'folder' | 'mail';
}

@Component({
  selector: 'app-rightbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightbar.component.html',
  styleUrl: './rightbar.component.scss',
})
export class RightbarComponent {
  navItems: NavItem[] = [
    { name: 'Home', target: 'hero', icon: 'home' },
    { name: 'Services', target: 'services', icon: 'briefcase' },
    { name: 'About', target: 'about', icon: 'user' },
    { name: 'Portfolio', target: 'portfolio', icon: 'folder' },
    { name: 'Contact', target: 'contact', icon: 'mail' },
  ];

  activeSection: RightbarSectionTarget = 'hero';

  constructor(public themeService: ThemeService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.activeSection = getActiveSection(this.navItems, 200, 'hero');
  }

  scrollTo(event: Event, sectionId: string): void {
    scrollToSection(event, sectionId, { behavior: 'smooth', block: 'start' });
  }
}
