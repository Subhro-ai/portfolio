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
      title: 'SurveilAI – Surveillance System Powered by AI',
      description: 'Developed an IoT and ML-powered system using ESP32 to predict vegetable freshness in real time.',
      imageUrl: '/surveil.png',
      githubUrl: 'https://github.com/Varsha010101/SurveilAI',
      hostedUrl: 'https://surveilai.onrender.com/'
    },
    {
      title: 'ESP32-Based Smart Vegetable Freshness Detection System',
      description: 'Developed an IoT and ML-powered system using ESP32 to predict vegetable freshness in real time.',
      imageUrl: '/iot.png',
      githubUrl: 'https://github.com/Subhro-ai/esp32-angular-vegetable-freshness-monitoring-system',
      hostedUrl: ''
    },
    {
      title: 'Aim Trainer Precision Shooting Practice Website',
      description: 'Developed an interactive aim training application to help users improve their mouse accuracy, reflexes, and reaction time through dynamic shooting exercises.',
      imageUrl: '/aim.png',
      githubUrl: 'https://github.com/Subhro-ai/aimTrainer-angular',
      hostedUrl: 'https://aim-trainer-rho.vercel.app/'
    },
  ];

  ngAfterViewInit(): void {
    const container = this.projectsContainer.nativeElement;
    const track = this.projectsTrack.nativeElement;

    this.scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - container.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth}`,
        invalidateOnRefresh: true
      }
    });
  }

  navigateTo(url: string): void {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.scrollTween?.scrollTrigger?.kill();
  }
}