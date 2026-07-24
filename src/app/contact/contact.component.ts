import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// PrimeNG Modules & Services
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ENDPOINT = 'https://portfolio-backend-42r1.onrender.com/send';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, InputTextModule, InputTextarea, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;
  @ViewChild('title') title!: ElementRef<HTMLElement>;
  @ViewChild('contactContainer') contactContainer!: ElementRef<HTMLElement>;

  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.contactSection.nativeElement,
        start: 'top 85%',
      }
    });

    tl.from(this.title.nativeElement, { opacity: 0, y: 50, duration: 0.6, ease: 'power2.out' })
      .from(this.contactContainer.nativeElement, { opacity: 0, y: 50, duration: 0.8, ease: 'power2.out' }, '-=0.4');
  }

  submitForm(form: NgForm): void {
    if (form.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all the required fields.' });
      return;
    }

    this.http.post(CONTACT_ENDPOINT, this.formData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully!' });
        form.resetForm();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message could not be sent. Please try again later.' });
        console.error('Error sending form:', error);
      }
    });
  }
}
