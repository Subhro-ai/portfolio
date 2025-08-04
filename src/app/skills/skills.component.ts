import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core'; // Corrected import path
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-skills',
  standalone: true, // Added standalone flag
  imports: [CommonModule, DividerModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit  {
  text: string = 'Languages';
  @ViewChildren('items') items!: QueryList<ElementRef>;
  @ViewChild('title') skills!: ElementRef;
  @ViewChild('languages') languages!: ElementRef;
  @ViewChild('tools') tools!: ElementRef;
  @ViewChild('frameworks') frameworks!: ElementRef;
  @ViewChild('head') head!: ElementRef;

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      trigger: this.skills.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      pin: true,
      markers: false,
    });
    ScrollTrigger.create({
      trigger: this.head.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      pin: true,
    });
    this.items.forEach((list: ElementRef, index: number) => { // Added type for 'list'
      gsap.from(list.nativeElement, {
        scrollTrigger: {
          trigger: list.nativeElement,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
          markers: false,
          toggleActions: 'play none none reverse',
        },
        x: 200,
        opacity: 0,

      });
    });
    ScrollTrigger.create({
      trigger: this.languages.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      markers: false,
      onEnter: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Languages',
        });
      },
    });
    ScrollTrigger.create({
      trigger: this.frameworks.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      markers: false,
      onEnter: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Frameworks',
        });
      },
      onLeaveBack: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Languages',
        });
      }
    });
    ScrollTrigger.create({
      trigger: this.tools.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      onEnter: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Tools',
        });
      },
      onLeaveBack: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Frameworks',
        });
      }
    })
  }
}
