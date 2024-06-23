import { keys } from './../../shared/configs/localstorage-key';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { roots } from 'src/app/shared/configs/endPoints';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  show_loader = new Subject<boolean>();
  pageData = new Subject<any>();
  removeUploadImg = new BehaviorSubject<boolean>(false);
  apiUrl: string = environment?.apiUrl;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private http: HttpClient
  ) { }
  getCurrentLanguage(): any {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(keys.language);;
    }
  }
  translateTextFromJson(text: string): any {
    return this.translate.instant(text);
  }
  createGoogleMapsLink(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${latitude},${longitude}`;
  }
  clearValidationErrors(control: AbstractControl): void {
    control.markAsPending();
  }
  validateAllFormFields(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getDiscountPloicy(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.discountPolicy}`);
  }

  getGenderOptions(): any {
    let arr: any = [
      {
        id: 1,
        title: "ذكر",
        // title: this.translateTextFromJson('gender.male'),
        value: 0
      },
      {
        id: 2,
        title: "أنثي",
        // title: this.translateTextFromJson('gender.female'),
        value: 1
      }
    ];
    return arr;
  }
  getSocialOptions(): any {
    let arr: any = [
      {
        id: 1,
        title: 'Facebook',
        value: 'facebook'
      },
      {
        id: 2,
        title: 'Linkedin',
        value: 'linkedin'
      },
      {
        id: 3,
        title: 'Youtube',
        value: 'youtube'
      },
      {
        id: 4,
        title: 'Twitter',
        value: 'twitter'
      },
      {
        id: 5,
        title: 'Instagram',
        value: 'instagram'
      }
    ];
    return arr;
  }
  getLanguages(): any {
    let arr: any = [
      {
        id: 1,
        title: 'عربي',
      },
      // {
      //   id: 2,
      //   title: 'انجليزي',
      // },
      // {
      //   id: 3,
      //   title: 'عربي-انجليزي',
      // }
    ];;
    return arr;
  }
  getAllPrefixes(): void {
    let arr: any = [
      {
        id: 1,
        name: 'دكتور',
      },
      {
        id: 2,
        name: 'أخصائي',
      },
      {
        id: 2,
        name: 'إستشاري',
      },
    ];
    return arr;
  }

  formatSizeUnits(size: any): void {
    if (size >= 1073741824) { size = (size / 1073741824).toFixed(2) + " GB"; }
    else if (size >= 1048576) { size = (size / 1048576).toFixed(2) + " MB"; }
    else if (size >= 1024) { size = (size / 1024).toFixed(2) + " KB"; }
    else if (size > 1) { size = size + " bytes"; }
    else if (size == 1) { size = size + " byte"; }
    else { size = "0 bytes"; }
    return size;
  }

  convertTimeOrDate(value: any, type?: any): void {
    var date: any = moment(value)?.format('YYYY-MM-DD');
    if (type == 'date') {
      return date;
    }
  }

}
