import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;
  @ViewChild('projectsTrack') projectsTrack!: ElementRef;

  private scrollTween: gsap.core.Tween | undefined;

  projects = [
    {
      title: 'Visalo – Real-time Visa Appointment Monitor',
      description: 'Developed a real-time visa appointment monitoring and notification service during my internship under ZeroHash Technology. The system tracks Schengen visa slot availability across multiple Irish and UK-based embassies/portals and alerts thousands of users instantly via Telegram and WhatsApp.',
      imageUrl: 'visalo.png',
      githubUrl: '',
      hostedUrl: 'https://www.visalo.xyz'
    },
    {
  title: 'CalSync – Automated College Timetable Sync',
  description: 'Developed a system that securely connects to a university portal, fetches real-time class schedules, and generates a live iCalendar (.ics) link to automatically sync timetable updates with personal calendar applications without manual intervention.',
  imageUrl: 'calsync.webp',
  githubUrl: 'https://github.com/Subhro-ai/calSync-backend',
  hostedUrl: 'https://trycalsync.duckdns.org/'
    },

    {
      title: 'SurveilAI – Surveillance System Powered by AI',
      description: 'Developed an IoT and ML-powered system using ESP32 to predict vegetable freshness in real time.',
      imageUrl: 'surveil.webp',
      githubUrl: 'https://github.com/Varsha010101/SurveilAI',
      hostedUrl: 'https://surveilai.onrender.com/'
    },
    {
      title: 'ESP32-Based Smart Vegetable Freshness Detection System',
      description: 'Developed an IoT and ML-powered system using ESP32 to predict vegetable freshness in real time.',
      imageUrl: 'iot.webp',
      githubUrl: 'https://github.com/Subhro-ai/esp32-angular-vegetable-freshness-monitoring-system',
      hostedUrl: ''
    },
    {
      title: 'Aim Trainer Precision Shooting Practice Website',
      description: 'Developed an interactive aim training application to help users improve their mouse accuracy, reflexes, and reaction time through dynamic shooting exercises.',
      imageUrl: 'aim.webp',
      githubUrl: 'https://github.com/Subhro-ai/aimTrainer-angular',
      hostedUrl: 'https://aim-trainer-rho.vercel.app/'
    },
  ];

  ngAfterViewInit(): void {
    const container = this.projectsContainer.nativeElement;
    const track = this.projectsTrack.nativeElement;

    // Use GSAP's matchMedia for responsive animations
    ScrollTrigger.matchMedia({
      // Desktop-only animation
      "(min-width: 769px)": () => {
        this.scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - container.offsetWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 2,
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true
          }
        });
      },
      // Mobile: No animation (natural scroll)
      "(max-width: 768px)": () => {
        // On mobile, we don't create the pinning scrollTween,
        // allowing the CSS to handle the vertical layout.
      }
    });
  }

  navigateTo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  ngOnDestroy(): void {
    // Kill the tween and its scrolltrigger
    this.scrollTween?.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
