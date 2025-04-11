import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
@Component({
    selector: 'app-root',
    imports: [HeaderComponent, HeroSectionComponent, AboutComponent, SkillsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

}


