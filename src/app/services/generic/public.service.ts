import { keys } from './../../shared/configs/localstorage-key';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  show_loader = new Subject<boolean>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
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
}
