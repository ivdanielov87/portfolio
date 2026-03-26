import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { RevealDirective } from '../../directives/reveal.directive';

type EmailJsError = {
  status?: number;
  text?: string;
};

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
  captcha?: string;
};

type ContactField = 'name' | 'email' | 'message';

type RecaptchaRenderOptions = {
  sitekey: string;
  theme?: 'light' | 'dark';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
};

type Grecaptcha = {
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __portfolioRecaptchaOnload__?: () => void;
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  private static readonly recaptchaScriptId = 'google-recaptcha-api';
  private static recaptchaLoader?: Promise<void>;
  private static readonly minimumNameLength = 2;
  private static readonly minimumMessageLength = 20;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly isBrowser: boolean;
  private recaptchaWidgetId?: number;
  private recaptchaRendered = false;
  private currentRecaptchaTheme: 'light' | 'dark' = 'light';
  private themeObserver?: MutationObserver;

  @ViewChild('recaptchaHost') private recaptchaHost?: ElementRef<HTMLElement>;

  name: string = '';
  email: string = '';
  message: string = '';
  honeypot: string = '';
  submitted: boolean = false;
  sending: boolean = false;
  sendError: string = '';
  recaptchaToken: string = '';
  recaptchaReady: boolean = false;
  recaptchaLoadError: string = '';
  errors: ContactErrors = {};

  // Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
  private readonly SERVICE_ID = 'service_n2h43vp';
  private readonly TEMPLATE_ID = 'template_n0q9hdr';
  private readonly PUBLIC_KEY = 'GbHc9qx4s9KHCAGqO';
  // Replace with your real Google reCAPTCHA v2 site key.
  private readonly RECAPTCHA_SITE_KEY: string = '6LfZCJUsAAAAAHh_vubufmAZGec6P_85G75d0epP';

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    emailjs.init({
      publicKey: this.PUBLIC_KEY,
      blockHeadless: true,
      limitRate: {
        id: 'portfolio-contact',
        throttle: 60_000,
      },
    });
  }

  ngAfterViewInit(): void {
    this.setupRecaptcha();
    this.observeThemeChanges();
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
  }

  get isRecaptchaConfigured(): boolean {
    return this.RECAPTCHA_SITE_KEY.trim().length > 0;
  }

  get canRenderRecaptcha(): boolean {
    return this.isBrowser && this.isRecaptchaConfigured;
  }

  get hasValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  get hasValidName(): boolean {
    return this.name.trim().length >= ContactComponent.minimumNameLength;
  }

  get hasValidMessage(): boolean {
    return this.message.trim().length >= ContactComponent.minimumMessageLength;
  }

  get nameHint(): string {
    const trimmedName = this.name.trim();

    if (!trimmedName) {
      return '';
    }

    if (!this.hasValidName) {
      return `Please enter at least ${ContactComponent.minimumNameLength} characters.`;
    }

    return '';
  }

  get emailHint(): string {
    const trimmedEmail = this.email.trim();

    if (!trimmedEmail) {
      return '';
    }

    if (!this.hasValidEmail) {
      return 'Use a valid email address, for example name@example.com.';
    }

    return '';
  }

  get messageHint(): string {
    const trimmedMessage = this.message.trim();

    if (!trimmedMessage) {
      return '';
    }

    if (!this.hasValidMessage) {
      const remainingCharacters = ContactComponent.minimumMessageLength - trimmedMessage.length;
      return `Please add a bit more detail. ${remainingCharacters} more character${remainingCharacters === 1 ? '' : 's'} needed.`;
    }

    return '';
  }

  get showNameWarning(): boolean {
    return !this.errors.name && !!this.nameHint;
  }

  get showEmailWarning(): boolean {
    return !this.errors.email && !!this.emailHint;
  }

  get showMessageWarning(): boolean {
    return !this.errors.message && !!this.messageHint;
  }

  get isSubmitDisabled(): boolean {
    return (
      this.sending ||
      !this.isRecaptchaConfigured ||
      !this.hasValidName ||
      !this.hasValidEmail ||
      !this.hasValidMessage ||
      !this.recaptchaToken
    );
  }

  get submitButtonText(): string {
    if (this.sending) return 'Sending...';
    return 'Send Message';
  }

  clearSuccess(): void {
    this.submitted = false;
    this.sendError = '';
  }

  onFieldInput(field: ContactField): void {
    this.clearSuccess();
    delete this.errors[field];
  }

  validate(): boolean {
    this.errors = {};

    if (!this.name.trim()) this.errors.name = 'Name is required';
    else if (!this.hasValidName) {
      this.errors.name = `Name must be at least ${ContactComponent.minimumNameLength} characters.`;
    }

    if (!this.email.trim()) this.errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors.email = 'Invalid email format';
    }

    if (!this.message.trim()) this.errors.message = 'Message is required';
    else if (!this.hasValidMessage) {
      this.errors.message = `Message must be at least ${ContactComponent.minimumMessageLength} characters.`;
    }

    if (!this.isRecaptchaConfigured) {
      this.errors.captcha = 'reCAPTCHA is not configured yet.';
    } else if (this.recaptchaLoadError) {
      this.errors.captcha = this.recaptchaLoadError;
    } else if (!this.recaptchaToken) {
      this.errors.captcha = 'Please complete the reCAPTCHA verification.';
    }

    return Object.keys(this.errors).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (this.honeypot.trim()) {
      this.sendError = 'Unable to send message right now. Please try again later.';
      return;
    }

    if (!this.validate()) {
      return;
    }

    this.sending = true;
    this.sendError = '';

    try {
      await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, {
        from_name: this.name,
        from_email: this.email,
        message: this.message,
        to_email: 'iv.danielov@gmail.com',
        'g-recaptcha-response': this.recaptchaToken,
      });

      this.submitted = true;
      this.name = '';
      this.email = '';
      this.message = '';
      this.honeypot = '';
      this.resetRecaptcha();
    } catch (error) {
      const emailError = error as EmailJsError;
      this.sendError =
        emailError.status === 429
          ? 'A message was just sent. Please wait about one minute before trying again.'
          : 'Failed to send message. Please try again later.';
      this.resetRecaptcha();
      console.error('EmailJS error:', error);
    } finally {
      this.sending = false;
      this.cdr.detectChanges();
    }
  }

  private setupRecaptcha(): void {
    if (!this.canRenderRecaptcha) {
      if (this.isBrowser && !this.isRecaptchaConfigured) {
        this.recaptchaLoadError =
          'Set your Google reCAPTCHA site key to enable email verification.';
      }
      return;
    }

    this.loadRecaptchaScript()
      .then(() => {
        this.renderRecaptcha();
      })
      .catch(() => {
        this.recaptchaLoadError =
          'Unable to load reCAPTCHA right now. Please disable blockers and try again.';
        this.cdr.detectChanges();
      });
  }

  private loadRecaptchaScript(): Promise<void> {
    if (window.grecaptcha) {
      return Promise.resolve();
    }

    if (ContactComponent.recaptchaLoader) {
      return ContactComponent.recaptchaLoader;
    }

    ContactComponent.recaptchaLoader = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById(
        ContactComponent.recaptchaScriptId,
      ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(), { once: true });
        return;
      }

      window.__portfolioRecaptchaOnload__ = () => resolve();

      const script = document.createElement('script');
      script.id = ContactComponent.recaptchaScriptId;
      script.src =
        'https://www.google.com/recaptcha/api.js?render=explicit&onload=__portfolioRecaptchaOnload__';
      script.async = true;
      script.defer = true;
      script.onerror = () => reject();
      document.head.appendChild(script);
    });

    return ContactComponent.recaptchaLoader;
  }

  private renderRecaptcha(): void {
    if (!this.recaptchaHost || !window.grecaptcha || this.recaptchaRendered) {
      return;
    }

    const mountPoint = this.createRecaptchaMountPoint();
    if (!mountPoint) {
      return;
    }

    this.currentRecaptchaTheme = this.getRecaptchaTheme();
    this.recaptchaWidgetId = window.grecaptcha.render(mountPoint, {
      sitekey: this.RECAPTCHA_SITE_KEY,
      theme: this.currentRecaptchaTheme,
      callback: (token: string) => {
        this.recaptchaToken = token;
        delete this.errors.captcha;
        this.sendError = '';
        this.cdr.detectChanges();
      },
      'expired-callback': () => {
        this.recaptchaToken = '';
        this.cdr.detectChanges();
      },
      'error-callback': () => {
        this.recaptchaToken = '';
        this.recaptchaLoadError =
          'reCAPTCHA verification failed to load. Please refresh and try again.';
        this.cdr.detectChanges();
      },
    });

    this.recaptchaReady = true;
    this.recaptchaRendered = true;
    this.cdr.detectChanges();
  }

  private observeThemeChanges(): void {
    if (!this.isBrowser || typeof MutationObserver === 'undefined') {
      return;
    }

    this.themeObserver = new MutationObserver(() => {
      const nextTheme = this.getRecaptchaTheme();

      if (this.recaptchaRendered && nextTheme !== this.currentRecaptchaTheme) {
        this.rerenderRecaptcha();
      }
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  private rerenderRecaptcha(): void {
    if (!this.recaptchaHost || !window.grecaptcha) {
      return;
    }

    this.recaptchaToken = '';
    this.recaptchaReady = false;
    this.recaptchaRendered = false;
    this.recaptchaWidgetId = undefined;
    this.renderRecaptcha();
  }

  private createRecaptchaMountPoint(): HTMLElement | null {
    const host = this.recaptchaHost?.nativeElement;
    if (!host) {
      return null;
    }

    host.replaceChildren();

    const mountPoint = document.createElement('div');
    mountPoint.className = 'contact__captcha-mount';
    host.appendChild(mountPoint);

    return mountPoint;
  }

  private resetRecaptcha(): void {
    this.recaptchaToken = '';
    if (this.recaptchaWidgetId !== undefined && window.grecaptcha) {
      window.grecaptcha.reset(this.recaptchaWidgetId);
    }
  }

  private getRecaptchaTheme(): 'light' | 'dark' {
    return document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
  }
}
