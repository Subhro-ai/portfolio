import { Component, QueryList, ViewChildren } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild, viewChildren } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements AfterViewInit{
  @ViewChild('grid') grid!: ElementRef;
  @ViewChildren('grid', { read: ElementRef }) gridItems!: QueryList<ElementRef>;
  ngAfterViewInit(): void {
    const items = this.grid.nativeElement.querySelectorAll('.grid-item');
      gsap.set(items, {
        opacity: 0,
        scale: 0,
        });
      gsap.to(items, {
        scrollTrigger: {
          trigger: this.grid.nativeElement,
          start: 'top 40%',
          end: 'bottom bottom',
          scrub: 0,
          markers: false,
        },
        stagger: 0.2,
        opacity: 100,
        scale: 1,
    });
  }
}
