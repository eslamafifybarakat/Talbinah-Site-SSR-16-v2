import { HomeService } from './../../services/home.service';
import { AlertsService } from './../../services/generic/alerts.service';
// Modules
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from './../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { environment } from './../../../environments/environment';
import { patterns } from './../../shared/configs/patterns';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Components
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    FooterComponent,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  private subscriptions: Subscription[] = [];

  contactForm = this.fb.group(
    {
      name: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: "blur" }],
      email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: "blur" }],
      subject: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: "blur" }],
    },
  );
  get formControls(): any {
    return this.contactForm?.controls;
  }
  isLoadingBtn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
    }
  }
  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | تواصل معنا');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | تواصل معنا' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | تواصل معنا' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | تواصل معنا' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  // Start Contact Us Functions
  submit(): void {
    const isFormValid: any = this.contactForm?.valid;
    if (isFormValid) {
      this.isLoadingBtn = true;
      const formData: FormData = this.createFormData();
      if (isPlatformBrowser(this.platformId)) {
        this.sendContactFormData(formData);
      }
    } else {
      this.publicService.validateAllFormFields(this.contactForm);
    }
  }
  private createFormData(): FormData {
    const formData: FormData = new FormData();
    formData.append('full_name', this.contactForm?.value?.name);
    formData.append('email', this.contactForm?.value?.email);
    formData.append('message', this.contactForm?.value?.subject);
    return formData;
  }
  private sendContactFormData(formData: FormData): void {
    let contactUsSubscription: Subscription = this.homeService?.contactUs(formData)
      .pipe(
        tap((res: any) => this.handleSuccessResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeContactRequest())
      ).subscribe();
    this.subscriptions.push(contactUsSubscription);
  }
  private handleSuccessResponse(res: any): void {
    if (res?.status == true) {
      this.contactForm.reset();
      this.cdr.detectChanges();
      this.handleSuccess(res?.message);
    } else {
      this.handleError(res?.message);
    }
  }
  private finalizeContactRequest(): void {
    this.isLoadingBtn = false;
  }
  // End Contact Us Functio

  /* --- Handle api requests messages --- */
  private handleSuccess(msg: string | null): any {
    this.setMessage(msg || 'تم تنفيذ طلبك بنجاح', 'succss');
  }
  private handleError(err: string | null): any {
    this.setMessage(err || 'حدث خطأ', 'error');
  }
  private setMessage(message: string, type?: string | null): void {
    this.alertsService.openToast(type, type, message);
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach((subscription: Subscription) => {
    //   if (subscription && !subscription.closed) {
    //     subscription.unsubscribe();
    //   }
    // });
  }
}
