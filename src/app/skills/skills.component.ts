import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DividerModule } from 'primeng/divider';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  imports: [CommonModule, DividerModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
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
      markers: true,
    });
    ScrollTrigger.create({
      trigger: this.head.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      pin: true,
    });
    this.items.forEach((list, index) => {
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
        color: '#F87537',
      });
    });
    ScrollTrigger.create({
      trigger: this.languages.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      markers: true,
      onEnter: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Languages',
        });
        console.log('Frameworks');
      },
    });
    ScrollTrigger.create({
      trigger: this.frameworks.nativeElement,
      start: 'top 10%',
      end: 'bottom 100%',
      markers: true,
      onEnter: () => {
        gsap.to(this.skills.nativeElement.querySelector('h2'), {
          text: 'Frameworks',
        });
        console.log('Frameworks');
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
      markers: true,
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
  
