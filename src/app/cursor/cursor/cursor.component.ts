import { Component, ElementRef, AfterViewInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css',
  standalone: true
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor', { static: false }) cursor!: ElementRef<HTMLDivElement>;
  @ViewChild('follower', { static: false }) follower!: ElementRef<HTMLDivElement>;

  private cursorX = 0;
  private cursorY = 0;
  private followerX = 0;
  private followerY = 0;
  private animationFrameId: number | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Small delay to ensure everything is mounted
    setTimeout(() => {
      this.setupCursor();
    }, 100);
  }

  private setupCursor(): void {
    if (!this.cursor || !this.follower) {
      console.warn('Cursor elements not available');
      return;
    }

    const cursorEl = this.cursor.nativeElement;
    const followerEl = this.follower.nativeElement;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;

      // Show cursors immediately on first move
      this.renderer.setStyle(cursorEl, 'opacity', '1');
      this.renderer.setStyle(followerEl, 'opacity', '1');
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      this.renderer.setStyle(cursorEl, 'opacity', '0');
      this.renderer.setStyle(followerEl, 'opacity', '0');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements
    this.addHoverEffects();

    // Start animation loop
    this.animate();

    // Store cleanup function
    this.cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    };
  }

  private animate = (): void => {
    if (!this.cursor || !this.follower) return;

    const cursorEl = this.cursor.nativeElement;
    const followerEl = this.follower.nativeElement;

    // Smoothly follow the cursor
    this.followerX += (this.cursorX - this.followerX) * 0.15;
    this.followerY += (this.cursorY - this.followerY) * 0.15;

    // Update cursor position (instant)
    this.renderer.setStyle(cursorEl, 'left', `${this.cursorX}px`);
    this.renderer.setStyle(cursorEl, 'top', `${this.cursorY}px`);

    // Update follower position (smooth)
    this.renderer.setStyle(followerEl, 'left', `${this.followerX}px`);
    this.renderer.setStyle(followerEl, 'top', `${this.followerY}px`);

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private addHoverEffects(): void {
    const selectors = 'a, button, input, textarea, .p-button, .p-card, [role="button"]';
    
    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      this.attachHoverListeners(selectors);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial attachment
    this.attachHoverListeners(selectors);

    // Store observer for cleanup
    this.mutationObserver = observer;
  }

  private attachHoverListeners(selectors: string): void {
    const elements = document.querySelectorAll(selectors);
    
    elements.forEach((el) => {
      if (!(el as any).__cursorListenersAttached) {
        el.addEventListener('mouseenter', this.handleHoverEnter);
        el.addEventListener('mouseleave', this.handleHoverLeave);
        (el as any).__cursorListenersAttached = true;
      }
    });
  }

  private handleHoverEnter = (): void => {
    if (!this.follower || !this.cursor) return;

    const followerEl = this.follower.nativeElement;
    const cursorEl = this.cursor.nativeElement;

    this.renderer.setStyle(followerEl, 'transform', 'translate(-50%, -50%) scale(1.5)');
    this.renderer.setStyle(followerEl, 'background-color', 'rgba(255, 255, 255, 0.2)');
    this.renderer.setStyle(cursorEl, 'transform', 'translate(-50%, -50%) scale(0.5)');
  };

  private handleHoverLeave = (): void => {
    if (!this.follower || !this.cursor) return;

    const followerEl = this.follower.nativeElement;
    const cursorEl = this.cursor.nativeElement;

    this.renderer.setStyle(followerEl, 'transform', 'translate(-50%, -50%) scale(1)');
    this.renderer.setStyle(followerEl, 'background-color', 'transparent');
    this.renderer.setStyle(cursorEl, 'transform', 'translate(-50%, -50%) scale(1)');
  };

  private cleanup: (() => void) | null = null;
  private mutationObserver: MutationObserver | null = null;

  ngOnDestroy(): void {
    if (this.cleanup) {
      this.cleanup();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}