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
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      summary: 'Responsive storefront UI with product browsing, cart flows and conversion-focused interactions.',
      stack: ['Angular', 'TypeScript', 'SCSS'],
      accent: 'Commerce',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock workspace image representing an e-commerce project'
    },
    {
      title: 'Brand Identity',
      category: 'UI/UX Design',
      summary: 'A polished visual system focused on typography, spacing and consistent cross-platform presentation.',
      stack: ['Design System', 'Figma', 'Prototype'],
      accent: 'Brand',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock creative desktop image representing a brand identity project'
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      summary: 'Clean mobile-first financial flows with trust-oriented UI patterns and concise dashboard views.',
      stack: ['React Native', 'UI Audit', 'Accessibility'],
      accent: 'Finance',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock mobile and laptop setup representing a banking application project'
    },
    {
      title: 'Analytics Dashboard',
      category: 'Web Development',
      summary: 'Data-heavy workspace with modular widgets, dense information hierarchy and efficient filtering.',
      stack: ['Angular', 'Charts', 'State Mgmt'],
      accent: 'Data',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock analytics screen image representing a dashboard project'
    },
    {
      title: 'Social Media App',
      category: 'Mobile Development',
      summary: 'Interactive feed experiences with strong content rhythm and polished messaging surfaces.',
      stack: ['Mobile UI', 'Performance', 'UX'],
      accent: 'Community',
      imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock social media device image representing a community application project'
    },
    {
      title: 'Portfolio Website',
      category: 'Web Development',
      summary: 'Personal brand site with theme support, refined section motion and responsive layout discipline.',
      stack: ['Angular', 'Animation', 'Responsive'],
      accent: 'Personal',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mock portfolio website image on a laptop screen'
    },
  ];
}
