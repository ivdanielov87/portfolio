import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  category: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3/SCSS', 'Tailwind CSS', 'RxJS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack', 'Figma', 'Linux'],
    },
  ];
}
