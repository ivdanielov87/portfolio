import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  title: string;
  category: string;
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
    { title: 'E-Commerce Platform', category: 'Web Development' },
    { title: 'Brand Identity', category: 'UI/UX Design' },
    { title: 'Mobile Banking App', category: 'Mobile Development' },
    { title: 'Analytics Dashboard', category: 'Web Development' },
    { title: 'Social Media App', category: 'Mobile Development' },
    { title: 'Portfolio Website', category: 'Web Development' },
  ];
}
