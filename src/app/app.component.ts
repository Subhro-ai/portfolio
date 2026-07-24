import { Component, HostListener } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { CursorComponent } from './cursor/cursor/cursor.component';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, HeroSectionComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent, CursorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';


}


