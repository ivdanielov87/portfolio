import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  title: string;
  description: string;
  icon: 'monitor' | 'smartphone' | 'pen-tool' | 'code' | 'search' | 'trending-up';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  isMobileView: boolean = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  services: Service[] = [
    {
      title: 'Web Development',
      description: 'Building modern, responsive websites using the latest technologies and best practices.',
      icon: 'monitor',
    },
    {
      title: 'Mobile Development',
      description: 'Creating cross-platform mobile applications with React Native and modern frameworks.',
      icon: 'smartphone',
    },
    {
      title: 'SPA Development',
      description: 'Architecting and building robust, highly interactive Single Page Applications (SPAs) using Angular and component-driven design.',
      icon: 'pen-tool',
    },
    {
      title: 'Clean Code',
      description: 'Writing maintainable, scalable and well-documented code following industry standards.',
      icon: 'code',
    },
    {
      title: 'SEO Optimization',
      description: 'Improving search engine visibility and performance for better organic reach.',
      icon: 'search',
    },
    {
      title: 'AI Integration',
      description: 'Integrating modern AI capabilities and APIs into web applications to deliver smart, automated and enhanced user experiences.',
      icon: 'trending-up',
    },
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isMobileView = window.innerWidth < 768;
  }

  getSectionTitleDelay(): number {
    return this.isMobileView ? 0 : 1200;
  }

  getCardRevealDelay(index: number): number {
    const startDelay = this.isMobileView ? 60 : index < 3 ? 2300 : 600;
    const step = this.isMobileView ? 120 : 180;
    return startDelay + index * step;
  }
}
