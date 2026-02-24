import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Web Development',
      description: 'Building modern, responsive websites using the latest technologies and best practices.',
      icon: '🌐',
    },
    {
      title: 'Mobile Development',
      description: 'Creating cross-platform mobile applications with React Native and modern frameworks.',
      icon: '📱',
    },
    {
      title: 'UI/UX Design',
      description: 'Designing intuitive and beautiful user interfaces with focus on user experience.',
      icon: '🎨',
    },
    {
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following industry standards.',
      icon: '💻',
    },
    {
      title: 'SEO Optimization',
      description: 'Improving search engine visibility and performance for better organic reach.',
      icon: '🔍',
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions to grow your brand and online presence.',
      icon: '📈',
    },
  ];
}
