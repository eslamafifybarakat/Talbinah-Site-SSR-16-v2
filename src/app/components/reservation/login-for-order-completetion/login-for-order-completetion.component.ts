// Components
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { Subscription, catchError, finalize, tap } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { patterns } from './../../../shared/configs/patterns';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-for-order-completetion',
  standalone: true,
  imports: [RouterModule, TranslateModule, FormsModule, ReactiveFormsModule, CommonModule, PasswordModule, CheckboxModule],
  templateUrl: './login-for-order-completetion.component.html',
  styleUrls: ['./login-for-order-completetion.component.scss']
})
export class LoginForOrderCompletetionComponent {
  private subscriptions: Subscription[] = [];

  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.pattern(patterns.email)], updateOn: 'blur' }],
    password: ['', { validators: Validators.required, updateOn: 'blur' }],
    remember: [false, []],
  });
  get formControls(): any {
    return this.loginForm?.controls;
  }
  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) { }

  back(): void {
    this.location.back();
  }

  submit(): void {
    if (this.loginForm?.valid) {
      this.publicService.show_loader.next(true);
      let data = {
        email: this.loginForm?.value?.email,
        password: this.loginForm?.value?.password,
      };
      //Send Request to login
      let loginSubscription: any = this.authService?.login(data)?.pipe(
        tap(res => this.handleSuccessLoggedIn(res)),
        catchError(err => this.handleError(err)),
        finalize(()=>{
          // this.router.navigate(['']);
        })
      ).subscribe();
      this.subscriptions.push(loginSubscription);
    } else {
      this.publicService.validateAllFormFields(this.loginForm);
    }
    this.router.navigate(['/Reservation/CompleteOrder']);
  }
  private handleSuccessLoggedIn(res: any): void {
    if (res?.success == true) {
      window.localStorage.setItem(keys.userData, JSON.stringify(res?.data));
    } else {
      this.handleError(res?.error?.message || this.publicService.translateTextFromJson('general.errorOccur'));
    }
  }
  private handleError(err: any): any {
    this.setErrorMessage(err || this.publicService.translateTextFromJson('general.errorOccur'));
  }
  private setErrorMessage(message: string): void {
    // this.alertsService.openToast('error', 'error', message);
    this.publicService.show_loader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
