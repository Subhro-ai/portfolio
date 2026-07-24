import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-skills',
  imports: [DividerModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('items') items!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('title') titleBox!: ElementRef<HTMLElement>;
  @ViewChild('languages') languages!: ElementRef<HTMLElement>;
  @ViewChild('frameworks') frameworks!: ElementRef<HTMLElement>;
  @ViewChild('tools') tools!: ElementRef<HTMLElement>;
  @ViewChild('head') head!: ElementRef<HTMLElement>;

  private heading!: Element | null;

  ngAfterViewInit(): void {
    this.heading = this.titleBox.nativeElement.querySelector('h2');

    // Keep the heading in view while the skill lists scroll past it.
    for (const pinned of [this.titleBox, this.head]) {
      ScrollTrigger.create({
        trigger: pinned.nativeElement,
        start: 'top 10%',
        end: 'bottom 100%',
        pin: true
      });
    }

    // Slide each list item in from the right as it enters the viewport.
    this.items.forEach(({ nativeElement }) => {
      gsap.from(nativeElement, {
        scrollTrigger: {
          trigger: nativeElement,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        },
        x: 200,
        opacity: 0
      });
    });

    // Retype the heading as each category comes into view, and restore the
    // previous category when scrolling back up.
    const categories = [
      { list: this.languages, label: 'Languages' },
      { list: this.frameworks, label: 'Frameworks' },
      { list: this.tools, label: 'Tools' }
    ];

    categories.forEach(({ list, label }, index) => {
      const previousLabel = categories[index - 1]?.label;

      ScrollTrigger.create({
        trigger: list.nativeElement,
        start: 'top 10%',
        end: 'bottom 100%',
        onEnter: () => this.setHeading(label),
        onLeaveBack: previousLabel ? () => this.setHeading(previousLabel) : undefined
      });
    });
  }

  private setHeading(text: string): void {
    gsap.to(this.heading, { text });
  }
}
