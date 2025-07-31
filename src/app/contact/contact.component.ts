import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea'; // Corrected import
import { ButtonModule } from 'primeng/button';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, InputTextModule, InputTextarea, ButtonModule], // Corrected import
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  @ViewChild('contactInfo') contactInfo!: ElementRef;

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.contactSection.nativeElement,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      }
    });

    tl.from(this.title.nativeElement, { opacity: 0, y: 50, duration: 1 })
      .from(this.form.nativeElement, { opacity: 0, x: -50, duration: 1 }, '-=0.5')
      .from(this.contactInfo.nativeElement, { opacity: 0, x: 50, duration: 1 }, '-=0.5');
  }
}