import { Component, inject, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { RevealDirective } from '../../directives/reveal.directive';

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
  icon: 'github' | 'linkedin';
}

interface NavLink {
  label: string;
  target: SectionTarget;
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
  private readonly el = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  mobileMenuOpen: boolean = false;
  activeSection: SectionTarget = 'hero';
  private sidebarEl!: HTMLElement;

  personalInfo: PersonalInfoItem[] = [
    { label: 'Email', value: 'iv.danielov@gmail.com' },
    { label: 'Residence', value: 'Bulgaria' },
    { label: 'Freelance', value: 'Available' },
    { label: 'Address', value: 'Ruse, Center' }
  ];

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/ivdanielov87', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ivelin-dimitrov-52aaa2186/', icon: 'linkedin' }
  ];

  languages: ChipItem[] = [
    { name: 'Bulgarian', detail: 'Native', icon: 'globe' },
    { name: 'English', detail: 'Fluent', icon: 'message' }
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
    { name: 'Ownership', icon: 'code' }
  ];

  navLinks: NavLink[] = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Contact', target: 'contact' }
  ];

  ngAfterViewInit(): void {
    this.sidebarEl = this.el.nativeElement.querySelector('.sidebar');
    this.updateStickyTop();
    this.updateActiveSection();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateStickyTop();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateActiveSection();
  }

  private updateStickyTop(): void {
    if (!this.sidebarEl) return;
    const margin = 40;
    this.sidebarEl.style.top = `${margin}px`;
  }

  private updateActiveSection(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
      this.activeSection = this.navLinks[this.navLinks.length - 1].target;
      return;
    }

    const scrollY = window.scrollY + 220;
    for (let i = this.navLinks.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.navLinks[i].target);
      if (section && section.offsetTop <= scrollY) {
        this.activeSection = this.navLinks[i].target;
        return;
      }
    }

    this.activeSection = 'hero';
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
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }
}
