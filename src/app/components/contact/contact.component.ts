import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private cdr = inject(ChangeDetectorRef);
  name = '';
  email = '';
  message = '';
  submitted = false;
  sending = false;
  sendError = '';
  errors: { name?: string; email?: string; message?: string } = {};
 
  // Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
  private readonly SERVICE_ID = 'service_n2h43vp';
  private readonly TEMPLATE_ID = 'template_n0q9hdr';
  private readonly PUBLIC_KEY = 'GbHc9qx4s9KHCAGqO';

  clearSuccess(): void {
    this.submitted = false;
    this.sendError = '';
  }

  validate(): boolean {
    this.errors = {};
    if (!this.name.trim()) this.errors.name = 'Name is required';
    if (!this.email.trim()) this.errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      this.errors.email = 'Invalid email format';
    if (!this.message.trim()) this.errors.message = 'Message is required';
    return Object.keys(this.errors).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (!this.validate()) return;

    this.sending = true;
    this.sendError = '';

    try {
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          from_name: this.name,
          from_email: this.email,
          message: this.message,
          to_email: 'iv.danielov@gmail.com',
        },
        this.PUBLIC_KEY
      );

      this.submitted = true;
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (error) {
      this.sendError = 'Failed to send message. Please try again later.';
      console.error('EmailJS error:', error);
    } finally {
      this.sending = false;
      this.cdr.detectChanges();
    }
  }
}
