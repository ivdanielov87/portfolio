import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  submitted = false;
  errors: { name?: string; email?: string; message?: string } = {};

  validate(): boolean {
    this.errors = {};
    if (!this.name.trim()) this.errors.name = 'Name is required';
    if (!this.email.trim()) this.errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      this.errors.email = 'Invalid email format';
    if (!this.message.trim()) this.errors.message = 'Message is required';
    return Object.keys(this.errors).length === 0;
  }

  onSubmit(): void {
    if (this.validate()) {
      this.submitted = true;
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
}
