// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

// Services
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { DoctorsService } from './../../../../services/doctors.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription, catchError, finalize, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule],
  selector: 'app-professional-data',
  templateUrl: './professional-data.component.html',
  styleUrls: ['./professional-data.component.scss']
})
export class ProfessionalDataComponent {
  private subscriptions: Subscription[] = [];
  @Output() professionalData = new EventEmitter();
  @Output() back = new EventEmitter();

  secondFormGroup: any = this.formBuilder?.group({
    country_id: [null, {
      validators: [Validators.required]
    }],
    license: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    organization: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    years_of_experience: ["", {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    language_id: [null, {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    prefix: [null, {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
  });
  get secondFormControls(): any {
    return this.secondFormGroup?.controls;
  }

  countriesList: any = [];
  isLoadingCountries: boolean = false;

  languages: any = [];
  isLoadingLanguages: boolean = false;

  prefixesList: any = [];
  isLoadingPrefixes: boolean = false;

  constructor(
    private doctorsService: DoctorsService,
    private dialogService: DialogService,
    public publicService: PublicService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.languages = this.publicService?.getLanguages();
    this.prefixesList = this.publicService?.getAllPrefixes();
    this.getCountries();
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
    } else {
      res?.message ? this.alertService?.openToast('error', 'error', res?.message) : '';
    }
    this.isLoadingCountries = false;
  }

  backStep(): void {
    this.back?.emit(1);
  }

  submitRegister(): void {
    if (this.secondFormGroup.valid) {
      let data = this.secondFormGroup.value;
      data['id'] = 2;
      this.professionalData.emit(data);
    } else {
      this.publicService.validateAllFormFields(this.secondFormGroup);
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
