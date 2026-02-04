import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'
import gsap from 'gsap';


@Component({
  selector: 'app-cursor',
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CursorComponent {
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('follower') follower!: ElementRef;

  constructor() {}

  ngOnInit(): void {
      setTimeout(() => {
      this.initCursor();
      this.addHoverListeners();
    }, 0);
  }

  initCursor() {
    const cursorEl = this.cursor.nativeElement;
    const followerEl = this.follower.nativeElement;

    // Center the cursor elements
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });
    gsap.set(followerEl, { xPercent: -50, yPercent: -50 });

    // Create quickTo functions for performance
    const xToCursor = gsap.quickTo(cursorEl, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursorEl, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(followerEl, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(followerEl, "y", { duration: 0.6, ease: "power3" });

    // Move cursor on mousemove
    window.addEventListener("mousemove", (e) => {
      // Show cursor when moving
      gsap.to([cursorEl, followerEl], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
      
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      gsap.to([cursorEl, followerEl], { autoAlpha: 0, duration: 0.5 });
    });
  }

  addHoverListeners() {
    // Select all interactive elements
    const hoverables = document.querySelectorAll('a, button, .card, input, textarea, .hover-trigger');
    
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => this.onHoverEnter());
      el.addEventListener('mouseleave', () => this.onHoverLeave());
    });
  }

  onHoverEnter() {
    gsap.to(this.follower.nativeElement, { 
      scale: 3, 
      opacity: 0.3,
      backgroundColor: 'var(--primary-color)',
      borderWidth: 0,
      duration: 0.3 
    });
    gsap.to(this.cursor.nativeElement, { 
      scale: 0.5, 
      backgroundColor: 'transparent',
      duration: 0.3 
    });
  }

  onHoverLeave() {
    gsap.to(this.follower.nativeElement, { 
      scale: 1, 
      opacity: 1,
      backgroundColor: 'transparent',
      borderWidth: '1px',
      duration: 0.3 
    });
    gsap.to(this.cursor.nativeElement, { 
      scale: 1, 
      backgroundColor: 'var(--text-color)', // Resets to theme color
      duration: 0.3 
    });
  }

  ngOnDestroy(): void {
    // Cleanup listeners if component is destroyed
    window.removeEventListener("mousemove", () => {});
    const hoverables = document.querySelectorAll('a, button');
    hoverables.forEach((el) => {
      el.removeEventListener('mouseenter', () => {});
      el.removeEventListener('mouseleave', () => {});
    });
  }
}
