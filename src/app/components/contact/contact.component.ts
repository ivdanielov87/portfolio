import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject } from '@angular/core';
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
export class ContactComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private readonly cooldownStorageKey = 'portfolio-contact-cooldown-until';
  private cooldownTimerId?: ReturnType<typeof setInterval>;
  private captchaResult = 0;

  name = '';
  email = '';
  message = '';
  captchaAnswer = '';
  honeypot = '';
  captchaQuestion = '';
  submitted = false;
  sending = false;
  sendError = '';
  cooldownRemainingSeconds = 0;
  errors: { name?: string; email?: string; message?: string; captcha?: string } = {};
 
  // Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
  private readonly SERVICE_ID = 'service_n2h43vp';
  private readonly TEMPLATE_ID = 'template_n0q9hdr';
  private readonly PUBLIC_KEY = 'GbHc9qx4s9KHCAGqO';

  ngOnInit(): void {
    this.generateCaptcha();
    this.restoreCooldown();
  }

  ngOnDestroy(): void {
    this.clearCooldownTimer();
  }

  get isCoolingDown(): boolean {
    return this.cooldownRemainingSeconds > 0;
  }

  get cooldownLabel(): string {
    const minutes = Math.floor(this.cooldownRemainingSeconds / 60);
    const seconds = this.cooldownRemainingSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get submitButtonText(): string {
    if (this.sending) return 'Sending...';
    if (this.isCoolingDown) return `Available in ${this.cooldownLabel}`;
    return 'Send Message';
  }

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
    if (!this.captchaAnswer.trim()) this.errors.captcha = 'Please solve the verification question';
    else if (Number(this.captchaAnswer.trim()) !== this.captchaResult)
      this.errors.captcha = 'Incorrect answer. Please try again.';
    return Object.keys(this.errors).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (this.honeypot.trim()) {
      this.sendError = 'Unable to send message right now. Please try again later.';
      return;
    }

    if (this.isCoolingDown) {
      this.sendError = `You can send another message in ${this.cooldownLabel}.`;
      return;
    }

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
      this.captchaAnswer = '';
      this.honeypot = '';
      this.startCooldown(60_000);
      this.generateCaptcha();
    } catch (error) {
      this.sendError = 'Failed to send message. Please try again later.';
      this.generateCaptcha();
      console.error('EmailJS error:', error);
    } finally {
      this.sending = false;
      this.cdr.detectChanges();
    }
  }

  private generateCaptcha(): void {
    const first = Math.floor(Math.random() * 8) + 2;
    const second = Math.floor(Math.random() * 8) + 1;
    this.captchaResult = first + second;
    this.captchaQuestion = `${first} + ${second}`;
  }

  private restoreCooldown(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(this.cooldownStorageKey);
    if (!stored) {
      return;
    }

    const expiresAt = Number(stored);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      window.localStorage.removeItem(this.cooldownStorageKey);
      return;
    }

    this.startCooldown(expiresAt - Date.now());
  }

  private startCooldown(durationMs: number): void {
    if (typeof window === 'undefined') {
      return;
    }

    const expiresAt = Date.now() + durationMs;
    window.localStorage.setItem(this.cooldownStorageKey, String(expiresAt));
    this.updateCooldown(expiresAt);
    this.clearCooldownTimer();

    this.cooldownTimerId = window.setInterval(() => {
      this.updateCooldown(expiresAt);

      if (!this.isCoolingDown) {
        this.clearCooldownTimer();
      }

      this.cdr.detectChanges();
    }, 1000);
  }

  private updateCooldown(expiresAt: number): void {
    const remainingMs = Math.max(0, expiresAt - Date.now());
    this.cooldownRemainingSeconds = Math.ceil(remainingMs / 1000);

    if (!this.cooldownRemainingSeconds && typeof window !== 'undefined') {
      window.localStorage.removeItem(this.cooldownStorageKey);
    }
  }

  private clearCooldownTimer(): void {
    if (this.cooldownTimerId) {
      clearInterval(this.cooldownTimerId);
      this.cooldownTimerId = undefined;
    }
  }
}
