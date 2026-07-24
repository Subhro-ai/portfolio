import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';

/** Elements that make the cursor react when hovered. */
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, .p-button, .p-card, [role="button"]';

/** Fraction of the remaining distance the follower covers each frame. */
const FOLLOW_EASE = 0.15;

/** Sub-pixel distance below which the follower counts as settled. */
const SETTLE_THRESHOLD = 0.01;

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css'
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor') cursor!: ElementRef<HTMLDivElement>;
  @ViewChild('follower') follower!: ElementRef<HTMLDivElement>;

  private cursorX = 0;
  private cursorY = 0;
  private followerX = 0;
  private followerY = 0;
  private renderedX: number | null = null;
  private renderedY: number | null = null;

  private frameId: number | null = null;
  private hovered: Element | null = null;

  constructor(private renderer: Renderer2, private zone: NgZone) {}

  ngAfterViewInit(): void {
    // None of this touches the template, so keep it out of Angular's zone:
    // otherwise every mouse move and animation frame would trigger a change
    // detection pass across the whole app.
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMouseMove, { passive: true });
      document.addEventListener('mouseleave', this.onMouseLeave);
      document.addEventListener('mouseover', this.onMouseOver, { passive: true });
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    document.removeEventListener('mouseover', this.onMouseOver);

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  private readonly onMouseMove = (event: MouseEvent): void => {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;

    this.setOpacity('1');
    this.requestFrame();
  };

  private readonly onMouseLeave = (): void => {
    this.setOpacity('0');
  };

  /**
   * One delegated listener replaces per-element mouseenter/mouseleave pairs.
   * `mouseover` bubbles, so the nearest interactive ancestor of the event
   * target tells us whether the cursor should be in its hover state.
   */
  private readonly onMouseOver = (event: MouseEvent): void => {
    const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;

    if (target === this.hovered) {
      return;
    }

    this.hovered = target;
    this.applyHoverState(target !== null);
  };

  /** Schedules a frame only when one is not already pending. */
  private requestFrame(): void {
    if (this.frameId === null) {
      this.frameId = requestAnimationFrame(this.tick);
    }
  }

  /**
   * Moves the dot to the pointer and eases the follower towards it. The loop
   * stops once both have settled and restarts on the next mouse move, so an
   * idle pointer costs nothing.
   */
  private readonly tick = (): void => {
    this.frameId = null;

    const dx = this.cursorX - this.followerX;
    const dy = this.cursorY - this.followerY;
    const settled = Math.abs(dx) < SETTLE_THRESHOLD && Math.abs(dy) < SETTLE_THRESHOLD;

    if (this.renderedX !== this.cursorX || this.renderedY !== this.cursorY) {
      this.renderedX = this.cursorX;
      this.renderedY = this.cursorY;
      this.setPosition(this.cursor.nativeElement, this.cursorX, this.cursorY);
    }

    if (!settled) {
      this.followerX += dx * FOLLOW_EASE;
      this.followerY += dy * FOLLOW_EASE;
      this.setPosition(this.follower.nativeElement, this.followerX, this.followerY);
      this.requestFrame();
    }
  };

  private setPosition(element: HTMLElement, x: number, y: number): void {
    this.renderer.setStyle(element, 'left', `${x}px`);
    this.renderer.setStyle(element, 'top', `${y}px`);
  }

  private setOpacity(value: string): void {
    this.renderer.setStyle(this.cursor.nativeElement, 'opacity', value);
    this.renderer.setStyle(this.follower.nativeElement, 'opacity', value);
  }

  private applyHoverState(active: boolean): void {
    const follower = this.follower.nativeElement;
    const cursor = this.cursor.nativeElement;

    this.renderer.setStyle(
      follower,
      'transform',
      active ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)'
    );
    this.renderer.setStyle(follower, 'background-color', active ? 'rgba(255, 255, 255, 0.2)' : 'transparent');
    this.renderer.setStyle(
      cursor,
      'transform',
      active ? 'translate(-50%, -50%) scale(0.5)' : 'translate(-50%, -50%) scale(1)'
    );
  }
}
