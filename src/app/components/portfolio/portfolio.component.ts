import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  accent: string;
  imageUrl: string;
  imageAlt: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      summary: 'Responsive storefront UI with product browsing, cart flows and conversion-focused interactions.',
      stack: ['Angular', 'TypeScript', 'SCSS'],
      accent: 'Commerce',
      imageUrl: 'https://images.unsplash.com/photo-1665686307516-1915b9616526?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
      imageAlt: 'Online shopping scene on a laptop representing an e-commerce project',
    },
    {
      title: 'Brand Identity',
      category: 'UI/UX Design',
      summary: 'A polished visual system focused on typography, spacing and consistent cross-platform presentation.',
      stack: ['Design System', 'Figma', 'Prototype'],
      accent: 'Brand',
      imageUrl: 'https://images.unsplash.com/photo-1561015314-6bd8c1e875ee?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
      imageAlt: 'Brand mockup cards representing a brand identity project',
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      summary: 'Clean mobile-first financial flows with trust-oriented UI patterns and concise dashboard views.',
      stack: ['React Native', 'UI Audit', 'Accessibility'],
      accent: 'Finance',
      imageUrl: '/portfolio-mobile-banking.svg',
      imageAlt: 'Mock banking app screen representing a mobile finance project',
    },
    {
      title: 'Analytics Dashboard',
      category: 'Web Development',
      summary: 'Data-heavy workspace with modular widgets, dense information hierarchy and efficient filtering.',
      stack: ['Angular', 'Charts', 'State Mgmt'],
      accent: 'Data',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
      imageAlt: 'Analytics dashboard on a laptop screen representing a data visualization project',
    },
    {
      title: 'Social Media App',
      category: 'Mobile Development',
      summary: 'Interactive feed experiences with strong content rhythm and polished messaging surfaces.',
      stack: ['Mobile UI', 'Performance', 'UX'],
      accent: 'Community',
      imageUrl: 'https://images.unsplash.com/photo-1745848413078-f85af10e5bf2?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
      imageAlt: 'Smartphone screen with social media apps representing a social media application project',
    },
    {
      title: 'Portfolio Website',
      category: 'Web Development',
      summary: 'Personal brand site with theme support, refined section motion and responsive layout discipline.',
      stack: ['Angular', 'Animation', 'Responsive'],
      accent: 'Personal',
      imageUrl: 'https://images.unsplash.com/photo-1642054220942-d3c7dd1466cb?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
      imageAlt: 'Website interface on a desktop screen representing a portfolio website project',
    },
  ];
}
