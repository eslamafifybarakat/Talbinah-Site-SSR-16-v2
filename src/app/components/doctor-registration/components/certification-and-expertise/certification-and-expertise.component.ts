import { DoctorsService } from './../../../../services/doctors.service';
import { PublicService } from 'src/app/services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { UploadFileInputComponent } from './../../../../shared/components/upload-file-input/upload-file-input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { Subscription, catchError, finalize, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MultiSelectModule, UploadFileInputComponent],
  selector: 'app-certification-and-expertise',
  templateUrl: './certification-and-expertise.component.html',
  styleUrls: ['./certification-and-expertise.component.scss']
})
export class CertificationAndExpertiseComponent {
  private subscriptions: Subscription[] = [];
  @Output() certificationData = new EventEmitter();
  @Output() back = new EventEmitter();

  cvFile: any;
  certificatesFiles: any;
  othersFiles: any;

  thirdFormGroup: any = this.fb?.group({
    egyPrice_15: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_15: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_30: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_30: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_45: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_45: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    egyPrice_60: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    dollarPrice_60: ["", {
      validators: [Validators.required, Validators.min(5)],
      updateOn: 'change'
    }],
    parentCategory: [null, [Validators.required]],
    // category_id: [[], [Validators.required]],
    cv: ["", [Validators.required]],
    certificate: ["", [Validators.required]],
    others: [""],
  });
  get thirdFormControls(): any {
    return this.thirdFormGroup?.controls;
  }

  parentCategoriesList: any = [];
  isLoadingSpecialists: boolean = false;

  enable_15_minutes: boolean = true;

  constructor(
    private doctorsService: DoctorsService,
    private publicService: PublicService,
    private alertService: AlertsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSpecialists();
  }

  getSpecialists(): void {
    this.isLoadingSpecialists = true;
    let specialistsSubscribe: Subscription = this.doctorsService?.getSpecialists().pipe(
      tap(res => this.handleSpecialistsResponse(res)),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingSpecialists = false)
    ).subscribe();
    this.subscriptions.push(specialistsSubscribe);
  }
  private handleSpecialistsResponse(res: any): void {
    if (res?.status) {
      this.parentCategoriesList = res?.data;
    } else {
      res?.message ? this.alertService?.openToast('error', 'error', res?.message) : '';
    }
    this.isLoadingSpecialists = false;
  }

  onEgyPriceChange(event: any): void {
    let egyPrice30: any = event * 2;
    let egyPrice45: any = event * 3;
    let egyPrice60: any = event * 4;
    this.thirdFormGroup?.patchValue({
      egyPrice_30: egyPrice30,
      egyPrice_45: egyPrice45,
      egyPrice_60: egyPrice60
    })
  }
  onDollarPriceChange(event: any): void {
    let dollarPrice30: any = event * 2;
    let dollarPrice45: any = event * 3;
    let dollarPrice60: any = event * 4;
    this.thirdFormGroup?.patchValue({
      dollarPrice_30: dollarPrice30,
      dollarPrice_45: dollarPrice45,
      dollarPrice_60: dollarPrice60
    })
  }

  uploadCv(e: any): void {
    let data: any = {
      file: e.image,
      image: e.file?.img[0]?.img
    }
    this.cvFile = data;
    this.thirdFormGroup?.patchValue({
      cv: data
    })
  }
  uploadCert(e: any): void {
    this.certificatesFiles = e;
    this.thirdFormGroup?.patchValue({
      certificate: e
    })
  }
  uploadOther(e: any): void {
    this.othersFiles = e;
    this.thirdFormGroup?.patchValue({
      others: e
    })
  }

  backStep(): void {
    this.back?.emit(2);
  }

  submitRegister(): void {
    if (this.thirdFormGroup.valid) {
      let data = this.thirdFormGroup.value;
      data['id'] = 3;
      data['certificatesFiles'] = this.certificatesFiles,
        data['othersFiles'] = this.othersFiles,
        data['cvFile'] = this.cvFile;
      this.certificationData.emit(data)
    } else {
      this.publicService.validateAllFormFields(this.thirdFormGroup);
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
