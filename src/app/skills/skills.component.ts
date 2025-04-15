import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('section') section!: ElementRef;
  @ViewChild('skillsList') skillsList!: ElementRef;
  skills : string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
  ]
  ngAfterViewInit(): void {
    // const list = gsap.utils.toArray(this.skillsList.nativeElement.querySelectorAll('li'));
    ScrollTrigger.create({
      trigger: this.title.nativeElement,
      start: '50% 50%',
      end: '100% 0%',
      scrub: 1,
      pin: true,
      markers: false,
    })

    gsap.set(this.skillsList.nativeElement, {
      y: '+=' + this.skillsList.nativeElement.offsetHeight,
      opacity: 0.5,
    });
    gsap.to(this.skillsList.nativeElement, {
      scrollTrigger: {
        trigger: this.skillsList.nativeElement,
        start: 'top 100%',
        end: 'top 0%',
        scrub: 1,
        markers: false,
      },
      y: '-=' + this.skillsList.nativeElement.offsetHeight,
      // duration: 1, 
      ease: 'power4.out',
      stagger: 0.2,
    });
    gsap.to(this.skillsList.nativeElement, {
      scrollTrigger: {
        trigger: this.skillsList.nativeElement,
        start: 'top 50%',
        end: 'top 0%',
        scrub: 1,
        markers: true,
      },
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.2,
    });
  }
  
}