import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutList') aboutList!: ElementRef<HTMLElement>;
  @ViewChild('star') star!: ElementRef<HTMLElement>;
  @ViewChild('typewriter') typewriter!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const list = this.aboutList.nativeElement;
    const items = list.querySelectorAll('.about-item');

    gsap.set(items, { opacity: 0, x: 300 });

    gsap.to(this.star.nativeElement, {
      scrollTrigger: {
        trigger: list,
        start: 'top 100%',
        end: 'top 30%',
        scrub: 1
      },
      rotation: 360,
      opacity: 1,
      scale: 2
    });

    gsap.to(items, {
      scrollTrigger: {
        trigger: list,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.2
    });

    gsap.to(this.typewriter.nativeElement, {
      scrollTrigger: {
        trigger: list,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0
      },
      text: 'ABOUT ME',
      ease: 'none'
    });
  }
}
