import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-header',
  imports: [ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  darkMode: boolean = true;

  ngOnInit() {
    const element : any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.scrollToSection('hero')
        },
        {
          label : 'About',
          icon : 'pi pi-user',
          command: () => this.scrollToSection('about')

        },
        {
          label: 'Skills',
          icon : 'pi pi-lightbulb',
          command: () => this.scrollToSection('skills')

        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            command: () => this.scrollToSection('projects')
        },
        {
          label : 'Contact',
          icon : 'pi pi-inbox',
          command: () => this.scrollToSection('contact')
        }
    ];
}
scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}


  toggleDarkMode() {
    const element : any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
    this.darkMode = !this.darkMode;
}

}
