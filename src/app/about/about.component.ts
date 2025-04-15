import { Component, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AfterViewInit } from '@angular/core';
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutList') aboutList!: ElementRef;
  // @ViewChildren('aboutList', { read: ElementRef }) listItems!: QueryList<ElementRef>;
  @ViewChild('star') star!: ElementRef;
  @ViewChild('typewriter') typewriter!: ElementRef;


  ngAfterViewInit(): void {
    
    

    const items = this.aboutList.nativeElement.querySelectorAll('.about-item');
    gsap.set(items, {
      opacity: 0,
      x: 300,
    });

    gsap.to(this.star.nativeElement, {
      scrollTrigger: {
        trigger: this.aboutList.nativeElement,
        start: 'top 100%',
        end: 'top 30%',
        scrub: 1,
        markers: false,
      },
      rotation: 360,
      opacity: 1,
      scale: 2,
    });

    gsap.to(items, {
      scrollTrigger: {
        trigger: this.aboutList.nativeElement,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0,
        markers: false,
      },
        opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.2,
        
    });
    gsap.to(this.typewriter.nativeElement, {
      scrollTrigger: {
        trigger : this.aboutList.nativeElement,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0,
      },
      text: "ABOUT ME",
      ease: "none"
    });
  }
}
