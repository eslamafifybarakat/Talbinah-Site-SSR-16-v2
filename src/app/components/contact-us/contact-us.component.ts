// Modules
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from './../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { environment } from './../../../environments/environment';
import { patterns } from './../../shared/configs/patterns';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Components
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  private subscriptions: Subscription[] = [];
  private imageBaseUrl: string = '';
  private metaDetails: MetaDetails | undefined;
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
    file: ['', Validators.required]  // Add file control
  });
  get formControls(): any {
    return this.contactForm?.controls;
  }
  /* --- End Contact Us Variables --- */

  fileName: string;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.fileName = input.files[0].name;
      // this.contactForm.patchValue({ file: input.files[0] });  // Set file control value
    }
  }
  
  clearFile(): void {
    this.contactForm.patchValue({ file: null });  // Clear file control value
    this.fileName = '';  // Clear file name display
  }

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    public publicService: PublicService,
    private fb: FormBuilder
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.initPageData();
  }
  private initPageData(): void {
    this.updateMetaTagsForSEO();
    this.imageBaseUrl = environment.imageBaseUrl;
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'تواصل معنا',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

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
