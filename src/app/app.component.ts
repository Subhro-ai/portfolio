import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, MenubarModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  items: MenuItem[] | undefined;

  ngOnInit() {
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
}

}


