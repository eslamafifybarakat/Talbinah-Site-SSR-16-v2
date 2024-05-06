import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from './../../../services/generic/public.service';
import { TranslateModule } from '@ngx-translate/core';
import { patterns } from '../../configs/patterns';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us-section',
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss']
})
export class ContactUsSectionComponent {
  @Input() imageSrc: string | null;
  @Input() pageName: string | null;

  private subscriptions: Subscription[] = [];
  private imageBaseUrl: string = '';
  private fullPageUrl: string = '';


  /* --- Start Contact Us Variables --- */
  contactForm = this.fb.group({
    radioGroup: this.fb.group({
      radio: ['', Validators.required]
    }),
    fullName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.pattern(patterns.email)], updateOn: 'blur' }],
    phoneNumber: ['', { validators: [Validators.required], updateOn: 'blur' }],
    message: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
  });
  get formControls(): any {
    return this.contactForm?.controls;
  }
  /* --- End Contact Us Variables --- */

  constructor(
    public publicService: PublicService,
    private fb: FormBuilder
  ) { }

  /* --- Start Contact Us Functions --- */
  submitContact(): void {
    if (this.contactForm?.valid) {
      let data = {
        email: this.contactForm?.value?.email,
        // password: this.contactForm?.value?.password,
      };
      //Send Request to login
      // let loginSubscription: any = this.authService?.login(data)?.pipe(
      //   tap(res => this.handleSuccessLoggedIn(res)),
      //   catchError(err => this.handleError(err))
      // ).subscribe();
      // this.subscriptions.push(loginSubscription);
    } else {
      this.publicService.validateAllFormFields(this.contactForm);
    }
  }
  /* --- End Contact Us Functions --- */

  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a sweetalert
    console.log(message);
    // this.alertsService?.openSweetAlert('error', message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
