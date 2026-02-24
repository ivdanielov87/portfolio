import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce application with real-time inventory management, payment integration, and an admin dashboard.',
      tags: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative project management tool featuring drag-and-drop boards, real-time updates, and team chat.',
      tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      link: '#',
    },
    {
      title: 'Weather Dashboard',
      description:
        'A responsive weather application that provides real-time forecasts, interactive maps, and severe weather alerts.',
      tags: ['Vue.js', 'D3.js', 'OpenWeather API'],
      link: '#',
    },
    {
      title: 'Social Media Analytics',
      description:
        'A data visualization dashboard that tracks engagement metrics, audience growth, and content performance.',
      tags: ['Python', 'Django', 'PostgreSQL', 'Chart.js'],
      link: '#',
    },
    {
      title: 'AI Chat Assistant',
      description:
        'An intelligent chatbot powered by natural language processing with context-aware responses and learning capabilities.',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'WebSocket'],
      link: '#',
    },
    {
      title: 'Fitness Tracker',
      description:
        'A mobile-first fitness application with workout logging, progress tracking, and personalized recommendations.',
      tags: ['React Native', 'GraphQL', 'AWS'],
      link: '#',
    },
  ];
}
