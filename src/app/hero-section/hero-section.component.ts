import {AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/TextPlugin';
gsap.registerPlugin(ScrollTrigger);



@Component({
  selector: 'app-hero-section',
  imports: [],
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements AfterViewInit{
  @ViewChild('blob1') blob1!: ElementRef;
  @ViewChild('blob2') blob2!: ElementRef;
  @ViewChild('title', { static: true }) title!: ElementRef;
  @ViewChild('subtitle', { static: true }) subtitle!: ElementRef;

  ngAfterViewInit(): void {
    this.blob1Animation();
    this.blob2Animation();
    this.titleAnimation();
  }

  blob1Animation() {
    gsap.to(this.blob1.nativeElement, {
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      attr: {
        d: 'M26.4,-35.2C33.9,-30.8,39.5,-22.7,42.1,-13.9C44.6,-5.1,44.1,4.6,40.7,12.6C37.2,20.7,30.9,27.3,23.6,31.8C16.4,36.2,8.2,38.7,-0.2,38.9C-8.5,39.1,-17.1,37.2,-21.9,31.9C-26.6,26.6,-27.7,18,-28.8,10.4C-29.9,2.7,-31.1,-3.9,-29.2,-9.5C-27.4,-15,-22.5,-19.6,-17.1,-24.7C-11.7,-29.8,-5.9,-35.5,1.8,-37.9C9.4,-40.4,18.8,-39.6,26.4,-35.2Z'
      },
    }

    );
  }
  blob2Animation() {
    gsap.to(this.blob2.nativeElement, {
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      attr: {
        d: 'M26.1,-36.2C33.1,-30.8,37.8,-22.3,39.2,-13.7C40.7,-5.1,39.1,3.5,36.7,12.2C34.3,20.9,31.1,29.7,24.9,34.4C18.6,39.1,9.3,39.7,0.5,39.1C-8.4,38.4,-16.8,36.5,-21.8,31.5C-26.9,26.4,-28.6,18.1,-29.9,10.5C-31.3,2.9,-32.3,-3.9,-30.2,-9.6C-28.1,-15.3,-22.9,-19.8,-17.4,-25.8C-11.8,-31.8,-5.9,-39.2,1.8,-41.7C9.5,-44.2,19,-41.7,26.1,-36.2Z'
      }
    }

    );
  }

  titleAnimation() {
    gsap.to([this.title.nativeElement, this.subtitle.nativeElement],{
      duration: 1,
      opacity: 1,
      y: -20,
      ease: 'power4.In',
      stagger: 0.5,
    });
  }
}

