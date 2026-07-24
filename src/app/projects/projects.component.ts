import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  hostedUrl: string;
}

@Component({
  selector: 'app-projects',
  imports: [CardModule, ButtonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef<HTMLElement>;
  @ViewChild('projectsTrack') projectsTrack!: ElementRef<HTMLElement>;

  private scrollTween: gsap.core.Tween | undefined;

  readonly projects: Project[] = [
    {
      title: 'Visalo – Real-time Visa Appointment Monitor',
      description:
        'Developed a real-time visa appointment monitoring and notification service during my internship under ZeroHash Technology. The system tracks Schengen visa slot availability across multiple Irish and UK-based embassies/portals and alerts thousands of users instantly via Telegram and WhatsApp.',
      imageUrl: 'visalo.png',
      githubUrl: '',
      hostedUrl: 'https://www.visalo.xyz'
    },
    {
      title: 'CalSync – Automated College Timetable Sync',
      description:
        'Developed a system that securely connects to a university portal, fetches real-time class schedules, and generates a live iCalendar (.ics) link to automatically sync timetable updates with personal calendar applications without manual intervention.',
      imageUrl: 'calsync.png',
      githubUrl: 'https://github.com/Subhro-ai/calSync-backend',
      hostedUrl: 'https://calsync-yhi1.onrender.com/'
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
      description:
        'Developed an interactive aim training application to help users improve their mouse accuracy, reflexes, and reaction time through dynamic shooting exercises.',
      imageUrl: 'aim.webp',
      githubUrl: 'https://github.com/Subhro-ai/aimTrainer-angular',
      hostedUrl: 'https://aim-trainer-rho.vercel.app/'
    }
  ];

  ngAfterViewInit(): void {
    const container = this.projectsContainer.nativeElement;
    const track = this.projectsTrack.nativeElement;

    ScrollTrigger.matchMedia({
      // Desktop: pin the section and translate the track sideways.
      '(min-width: 769px)': () => {
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
      }
      // Mobile has no matching handler: the CSS stacks the cards and they
      // scroll naturally.
    });
  }

  navigateTo(url: string): void {
    if (!url) {
      return;
    }

    const opened = window.open(url, '_blank');

    // Deny the new tab access back to this window.
    if (opened) {
      opened.opener = null;
    }
  }

  ngOnDestroy(): void {
    // Only tear down this component's trigger, not every trigger on the page.
    this.scrollTween?.scrollTrigger?.kill();
    this.scrollTween?.kill();
  }
}
