import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Morph targets for the idle blob animation, keyed by their view child. */
const BLOB_MORPH_PATHS = {
  blob1:
    'M26.4,-35.2C33.9,-30.8,39.5,-22.7,42.1,-13.9C44.6,-5.1,44.1,4.6,40.7,12.6C37.2,20.7,30.9,27.3,23.6,31.8C16.4,36.2,8.2,38.7,-0.2,38.9C-8.5,39.1,-17.1,37.2,-21.9,31.9C-26.6,26.6,-27.7,18,-28.8,10.4C-29.9,2.7,-31.1,-3.9,-29.2,-9.5C-27.4,-15,-22.5,-19.6,-17.1,-24.7C-11.7,-29.8,-5.9,-35.5,1.8,-37.9C9.4,-40.4,18.8,-39.6,26.4,-35.2Z',
  blob2:
    'M26.1,-36.2C33.1,-30.8,37.8,-22.3,39.2,-13.7C40.7,-5.1,39.1,3.5,36.7,12.2C34.3,20.9,31.1,29.7,24.9,34.4C18.6,39.1,9.3,39.7,0.5,39.1C-8.4,38.4,-16.8,36.5,-21.8,31.5C-26.9,26.4,-28.6,18.1,-29.9,10.5C-31.3,2.9,-32.3,-3.9,-30.2,-9.6C-28.1,-15.3,-22.9,-19.8,-17.4,-25.8C-11.8,-31.8,-5.9,-39.2,1.8,-41.7C9.5,-44.2,19,-41.7,26.1,-36.2Z',
  blob3:
    'M26.1,-23C31,-14.6,30.3,-3.9,27.2,4.7C24,13.4,18.4,20,10.2,25.7C2,31.3,-8.8,36,-17.9,33.2C-26.9,30.3,-34.2,19.9,-37.1,8.2C-39.9,-3.5,-38.4,-16.4,-31.5,-25.2C-24.5,-34,-12.3,-38.6,-0.8,-37.9C10.6,-37.3,21.2,-31.3,26.1,-23Z'
} as const;

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChild('blob1') blob1!: ElementRef<SVGPathElement>;
  @ViewChild('blob2') blob2!: ElementRef<SVGPathElement>;
  @ViewChild('blob3') blob3!: ElementRef<SVGPathElement>;
  @ViewChild('container', { static: true }) titleContainer!: ElementRef<HTMLElement>;
  @ViewChild('title', { static: true }) title!: ElementRef<HTMLElement>;
  @ViewChild('subtitle', { static: true }) subtitle!: ElementRef<HTMLElement>;
  @ViewChild('blobContainer1', { static: true }) blobContainer1!: ElementRef<HTMLElement>;
  @ViewChild('blobContainer2', { static: true }) blobContainer2!: ElementRef<HTMLElement>;
  @ViewChild('section') section!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    gsap.set([this.title.nativeElement, this.subtitle.nativeElement], {
      opacity: 0,
      y: 30
    });

    this.titleAnimation();
    this.blobFlyawayOnScroll();
    this.titleFlyawayOnScroll();
    this.blobIdleAnimations();

    // Pin the title container.
    ScrollTrigger.create({
      trigger: this.titleContainer.nativeElement,
      start: 'top 20%',
      end: '+=100%',
      pin: true,
      scrub: true
    });
  }

  /** Each blob endlessly morphs between its markup path and the one above. */
  private blobIdleAnimations(): void {
    for (const [ref, d] of Object.entries(BLOB_MORPH_PATHS)) {
      const blob = this[ref as keyof typeof BLOB_MORPH_PATHS];

      gsap.to(blob.nativeElement, {
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        attr: { d }
      });
    }
  }

  private titleAnimation(): void {
    gsap.to([this.title.nativeElement, this.subtitle.nativeElement], {
      autoAlpha: 1,
      duration: 1,
      y: -100,
      ease: 'power2.In',
      stagger: 0.5
    });
  }

  private titleFlyawayOnScroll(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.section.nativeElement,
        start: 'top top',
        end: '50% top',
        scrub: 1
      }
    });

    tl.to(this.title.nativeElement, { y: '-100vh', ease: 'power2.out' }, 0)
      .to(this.subtitle.nativeElement, { y: '-100vh', ease: 'power2.out' }, 0);
  }

  private blobFlyawayOnScroll(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.section.nativeElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    tl.to(this.blobContainer1.nativeElement, { y: '-220vh', ease: 'power2.out' }, 0)
      .to(this.blobContainer2.nativeElement, { y: '-200vh', ease: 'power2.out' }, 0)
      .to(this.blob3.nativeElement, { y: '-50vh', ease: 'power2.out' }, 0);
  }
}
