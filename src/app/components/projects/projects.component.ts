import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  category: string;
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
    { title: 'E-Commerce Platform', category: 'Web Development' },
    { title: 'Brand Identity', category: 'UI/UX Design' },
    { title: 'Mobile Banking App', category: 'Mobile Development' },
    { title: 'Analytics Dashboard', category: 'Web Development' },
    { title: 'Social Media App', category: 'Mobile Development' },
    { title: 'Portfolio Website', category: 'Web Development' },
  ];
}
