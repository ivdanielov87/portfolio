import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    RightbarComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
