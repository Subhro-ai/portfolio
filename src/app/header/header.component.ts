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
        },
        {
          label : 'About',
          icon : 'pi pi-user'
        },
        {
          label: 'Skills',
          icon : 'pi pi-lightbulb'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
        },
        {
          label : 'Contact',
          icon : 'pi pi-inbox'
        }
    ];
}

  toggleDarkMode() {
    const element : any = document.querySelector('html');
    element.classList.toggle('my-app-dark');
    this.darkMode = !this.darkMode;
}

}
