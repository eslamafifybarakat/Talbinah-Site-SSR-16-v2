import { DoctorsService } from './../../../../services/doctors.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
import { ConfirmPasswordValidator } from './../../../../shared/configs/confirm-password-validator';
import { patterns } from './../../../../shared/configs/patterns';
import { PublicService } from './../../../../services/generic/public.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from "primeng/divider";
import { SocialLinksComponent } from './social-links/social-links.component';
import { Subscription, catchError, finalize, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, DropdownModule, PasswordModule, CalendarModule, DividerModule, FileUploadComponent, SocialLinksComponent],
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  private subscriptions: Subscription[] = [];

  constructor(
    private doctorsService: DoctorsService,
    public publicService: PublicService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
  ) { }
  @Output() personalInfo = new EventEmitter();

  doctorImg: string = '';
  imageNameString: string = '';
  imageName: string = '';
  isEditImage: boolean = false;
  showImage: boolean = false;

  isPasswordChange: boolean = false;
  linksSocial: any = [];
  todayDate: Date = new Date();
  readonly minAge = 18;
  maxDate: any = new Date(new Date()?.getFullYear() - this.minAge, new Date()?.getMonth(), new Date()?.getDate());

  firstFormGroup = this.formBuilder?.group(
    {
      doctorImg: ["", [Validators.required]],
      name_en: ['', {
        validators: [Validators.required, Validators.pattern(patterns.nameEnPattern), Validators.minLength(2), Validators.maxLength(40)],
        updateOn: 'blur'
      }],
      name_ar: ['', {
        validators: [Validators.required, Validators.pattern(patterns.nameArPattern), Validators.minLength(2), Validators.maxLength(40)],
        updateOn: 'blur'
      }],
      email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: "blur" }],
      phone: ["", { validators: [Validators.required], updateOn: "blur" }],
      phoneCode: [null, { validators: [Validators.required] }],
      // Validators.pattern(/^\d{7,14}$/)
      // phone: ["", { validators: [Validators.required, Validators.pattern(/^\+966\d{9}$/)], updateOn: "blur" }],
      // phoneNumbers: this.formBuilder.array([this.createPhoneNumber()]),
      gender: [null, [Validators.required]],
      birthdate: [this.maxDate, [Validators.required]],
      terms_conditions: [false, Validators.required],
      password: ['', {
        validators: [Validators.required, Validators.pattern(patterns?.password)],
        updateOn: 'blur'
      }],
      confirmPassword: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  );
  createPhoneNumber(phone_code?: any): FormGroup {
    return this.formBuilder.group({
      countryCode: [phone_code, Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,14}$/)]]
    });
  }
  get firstFormControls(): any {
    return this.firstFormGroup?.controls;
  }
  get phoneNumbers(): FormArray {
    return this.firstFormGroup.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.createPhoneNumber());
  }
  genderOptions: any = [];
  countriesList: any = [];
  isLoadingCountries: boolean = false;
  ngOnInit(): void {
    this.genderOptions = this.publicService.getGenderOptions();
    this.getCountries();
  }
  onFocusConfirmPassword(): void {
    this.isPasswordChange = false;
  }
  uploadImage(e: any): void {
    this.doctorImg = e;
    this.firstFormGroup?.patchValue({
      doctorImg: e
    })
  }

  getCountries(): void {
    this.isLoadingCountries = true;
    let countriesSubscribe: Subscription = this.doctorsService?.getCountries().pipe(
      tap(res => this.handleCountriesResponse(res)),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingCountries = false)
    ).subscribe();
    this.subscriptions.push(countriesSubscribe);
  }
  private handleCountriesResponse(res: any): void {
    if (res?.status) {
      this.countriesList = res?.data;
      this.countriesList?.forEach((el: any) => {
        if (el.phone_code == '+20') {
          this.firstFormGroup?.patchValue({
            phoneCode: el
          })
        }
      });
    } else {
      res?.message ? this.alertService?.openToast('error', 'error', res?.message) : '';
    }
    this.isLoadingCountries = false;
  }


  openPdfViewer(): void { }

  getSocialLinks(event: any): void {
    let arr = event;
    arr.forEach((element: any) => {
      element['title'] = element?.name?.value;
    });
    this.linksSocial = arr;
  }
  submitRegister(): void {
    if (this.firstFormGroup.valid) {
      this.personalInfo.emit({
        formValues: this.firstFormGroup.value,
        socialLinkL: this.linksSocial
      })
    } else {
      this.publicService.validateAllFormFields(this.firstFormGroup);
    }
  }
  private handleError(error: any): any {
    error ? this.alertService?.openToast('error', 'error', error || this.publicService.translateTextFromJson('general.errorOccur')) : '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
