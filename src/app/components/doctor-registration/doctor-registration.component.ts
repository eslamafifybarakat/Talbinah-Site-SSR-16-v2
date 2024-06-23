import { DoctorsService } from './../../services/doctors.service';
import { PublicService } from 'src/app/services/generic/public.service';
import { AlertsService } from './../../services/generic/alerts.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfessionalDataComponent } from './components/professional-data/professional-data.component';
import { CertificationAndExpertiseComponent } from './components/certification-and-expertise/certification-and-expertise.component';
import { ReviewAndSubmitComponent } from './components/review-and-submit/review-and-submit.component';
import { Router } from '@angular/router';
import { Subscription, catchError, finalize, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, PersonalInfoComponent, ProfessionalDataComponent, CertificationAndExpertiseComponent, ReviewAndSubmitComponent],
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent {
  private subscriptions: Subscription[] = [];
  personalInfo: any;
  professionalData: any;
  certificationData: any;
  submittedData: any;

  steps: any = [
    {
      id: 1,
      title: '١.البيانات الشخصية',
      icon: 'fas fa-user',
      isSelected: true,
    },
    {
      id: 2,
      title: '٢.البيانات المهنية',
      icon: 'fas fa-pen',
      isSelected: false,
    },
    {
      id: 3,
      title: '٣.الشهادات والخبرات',
      icon: 'fas fa-user-edit',
      isSelected: false,
    },
    {
      id: 4,
      title: '٤.إرسال و مراجعة',
      icon: 'fas fa-handshake',
      isSelected: false,
    }
  ];
  stepNum: number = 1;

  constructor(
    private doctorsService: DoctorsService,
    private publicService: PublicService,
    private alertService: AlertsService,
    private router: Router
  ) { }

  submitPersonalInfo(data: any): void {
    this.personalInfo = data;
    this.steps.forEach((item: any) => {
      item.isSelected = false;
      if (item.id == data.id + 1) {
        item.isSelected = true;
      }
    });
    this.stepNum = 2;
  }
  submitProfessionalData(data: any): void {
    this.professionalData = data;
    this.steps.forEach((item: any) => {
      item.isSelected = false;
      if (item.id == data.id + 1) {
        item.isSelected = true;
      }
    });
    this.stepNum = 3;
  }
  submitCertificationData(data: any): void {
    this.certificationData = data;
    this.steps.forEach((item: any) => {
      item.isSelected = false;
      if (item.id == data.id + 1) {
        item.isSelected = true;
      }
    });
    this.submittedData['personalInfo'] = this.personalInfo;
    this.submittedData['professionalData'] = this.professionalData;
    this.submittedData['certificationData'] = this.certificationData;
    this.stepNum = 4;
  }
  back(step: any): void {
    this.stepNum = step;
  }

  registerNow(): void {
    let data = this.prepareFormData();
    this.register(data);
  }
  register(data: any): void {
    this.publicService?.show_loader?.next(true);
    let registerSubscribe: Subscription = this.doctorsService?.joinUs(data).pipe(
      tap(res => this.handleRegisterResponse(res)),
      catchError(err => this.handleError(err)),
      finalize(() => this.publicService?.show_loader?.next(false))
    ).subscribe();
    this.subscriptions.push(registerSubscribe);
  }
  private prepareFormData(): any {
    var formData: any = new FormData();
    formData.append("image", this.personalInfo?.doctorImg?.imageName);
    formData.append("full_name_en", this.personalInfo?.name_en);
    formData.append("full_name_ar", this.personalInfo?.name_ar);
    formData.append("email", this.personalInfo?.email);
    // formData.append("phone_no", this.publicService?.removeNonNumeric(this.personalInfo?.phone?.number));
    formData.append("phone_no", this.personalInfo?.phone);
    formData.append("phone_code", this.personalInfo?.phoneCode?.phone_code);
    formData.append("gender", this.personalInfo?.gender?.value);
    formData.append("password", this.personalInfo?.password);
    formData.append("birth_date", this.publicService?.convertTimeOrDate(this.personalInfo?.birthdate, 'date'));
    formData.append("terms_conditions", this.personalInfo?.terms_conditions);
    formData.append("country_id", this.professionalData?.country_id?.id);
    formData.append("country", this.professionalData?.country_id?.name);
    formData.append("license_number", this.professionalData?.license)
    formData.append("license_origin", this.professionalData?.organization);
    formData.append("years_experience", this.professionalData?.years_of_experience);
    this.professionalData?.language_id
      ? formData.append("language", 'arabic')
      // ? formData.append("language", this.professionalData?.language_id?.id)
      : "";
    formData.append("title", this.professionalData?.prefix?.name);
    formData.append("price_half_hour_usd", this.certificationData?.dollarPrice_30);
    formData.append("price_half_hour_sar", this.certificationData?.egyPrice_30);
    this.certificationData?.parentCategory.forEach((item: any) => {
      formData.append("specialists[]", item?.id);
    });

    formData.append("cv", this.certificationData?.cvFile?.file);
    for (var i = 0; i < this.certificationData?.certificatesFiles?.image?.length; i++) {
      formData.append("certifications[]", this.certificationData?.certificatesFiles?.image[i]);
    }
    for (var i = 0; i < this.certificationData?.othersFiles?.image?.length; i++) {
      formData.append("other", this.certificationData?.othersFiles?.image[i]);
    }
    if (this.personalInfo?.socialLinkL?.length > 0) {
      this.personalInfo?.socialLinkL?.forEach((element: any) => {
        formData.append(`social[${element?.name?.value}]`, element?.link);
      });
    }
    return formData;
  }
  private handleRegisterResponse(res: any): void {
    if (res?.status) {
      this.handleSuccess(res?.message);
      this.router?.navigate(['/Doctors']);
    } else {
      this.handleError(res?.message);
    }
    this.publicService?.show_loader?.next(false);
  }

  private handleError(error: any): any {
    error ? this.alertService?.openToast('error', 'error', error || this.publicService.translateTextFromJson('general.errorOccur')) : '';
  }
  private handleSuccess(msg: any): void {
    this.alertService?.openToast('success', 'success', msg)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
