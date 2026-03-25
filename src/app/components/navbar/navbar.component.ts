import { Component, inject, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { RevealDirective } from '../../directives/reveal.directive';
import { getActiveSection, scrollToSection, type SectionLink } from '../../utils/scroll.utils';

type SectionTarget = 'hero' | 'about' | 'services' | 'portfolio' | 'contact';

interface ChipItem {
  name: string;
  detail?: string;
  icon: 'globe' | 'message' | 'code' | 'palette' | 'bolt' | 'braces' | 'react' | 'angular' | 'users' | 'sparkles';
}

interface SkillGroup {
  label: string;
  items: ChipItem[];
}

interface PersonalInfoItem {
  label: string;
  value: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'link';
}

interface NavLink extends SectionLink<SectionTarget> {
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  themeService: ThemeService = inject(ThemeService);
  private readonly cdr = inject(ChangeDetectorRef);
  mobileMenuOpen: boolean = false;
  activeSection: SectionTarget = 'hero';

  personalInfo: PersonalInfoItem[] = [
    { label: 'Email', value: 'iv.danielov@gmail.com' },
    { label: 'Residence', value: 'Bulgaria' },
    { label: 'Freelance', value: 'Available' },
    { label: 'Address', value: 'Ruse, Center' },
  ];

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/ivdanielov87', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ivelin-dimitrov-52aaa2186/', icon: 'linkedin' },
    { name: 'Website', url: '#', icon: 'link' },
  ];

  languages: ChipItem[] = [
    { name: 'Bulgarian', detail: 'Native', icon: 'globe' },
    { name: 'English', detail: 'Fluent', icon: 'message' },
  ];

  skillGroups: SkillGroup[] = [
    {
      label: 'Languages',
      items: [
        { name: 'HTML', icon: 'code' },
        { name: 'CSS', icon: 'palette' },
        { name: 'JavaScript', icon: 'bolt' },
        { name: 'TypeScript', icon: 'braces' },
      ],
    },
    {
      label: 'Frameworks',
      items: [
        { name: 'React', icon: 'react' },
        { name: 'Angular', icon: 'angular' },
        { name: 'RxJS', icon: 'bolt' },
      ],
    },
    {
      label: 'Tools & Workflow',
      items: [
        { name: 'REST APIs', icon: 'braces' },
        { name: 'Figma', icon: 'palette' },
        { name: 'Responsive Design', icon: 'palette' },
        { name: 'Git', icon: 'code' },
        { name: 'Large-Scale Web Apps', icon: 'angular' },
      ],
    },
  ];

  softSkills: ChipItem[] = [
    { name: 'Teamwork', icon: 'users' },
    { name: 'Dedication', icon: 'sparkles' },
    { name: 'Effective Communication', icon: 'message' },
    { name: 'Problem Solving', icon: 'bolt' },
    { name: 'Adaptability', icon: 'globe' },
    { name: 'Ownership', icon: 'code' },
  ];

  navLinks: NavLink[] = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Contact', target: 'contact' },
  ];

  ngAfterViewInit(): void {
    this.updateActiveSection();
    this.cdr.detectChanges();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    this.activeSection = getActiveSection(this.navLinks, 220, 'hero');
  }

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

  scrollTo(event: Event, sectionId: string): void {
    scrollToSection(event, sectionId);
    this.closeMenu();
  }
}
