import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

/** Class PrimeNG watches to switch its theme (see `darkModeSelector`). */
const DARK_MODE_CLASS = 'my-app-dark';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  darkMode = true;

  readonly items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', command: () => this.scrollToSection('hero') },
    { label: 'About', icon: 'pi pi-user', command: () => this.scrollToSection('about') },
    { label: 'Skills', icon: 'pi pi-lightbulb', command: () => this.scrollToSection('skills') },
    { label: 'Projects', icon: 'pi pi-search', command: () => this.scrollToSection('projects') },
    { label: 'Contact', icon: 'pi pi-inbox', command: () => this.scrollToSection('contact') }
  ];

  ngOnInit(): void {
    // The site opens in dark mode.
    document.documentElement.classList.toggle(DARK_MODE_CLASS);
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleDarkMode(): void {
    document.documentElement.classList.toggle(DARK_MODE_CLASS);
    this.darkMode = !this.darkMode;
  }
}
