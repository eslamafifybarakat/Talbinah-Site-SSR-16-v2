import { DownloadAppBarComponent } from './shared/components/download-app-bar/download-app-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProviders } from './core/interceptors/interceptor-index';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';

import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

import { BottomNavigationComponent } from './shared/components/bottom-navigation/bottom-navigation.component';
import { OverlayLoadingComponent } from './shared/components/overlay-loading/overlay-loading.component';
import { NavbarMobileComponent } from './shared/components/navbar-mobile/navbar-mobile.component';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BottomNavigationComponent,
    OverlayLoadingComponent,
    DownloadAppBarComponent,
    NavbarMobileComponent,
    ScrollTopComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,

    BrowserModule.withServerTransition({ appId: 'my-app', }),
    BrowserAnimationsModule,
    LazyLoadImageModule, // add LazyLoadImageModule here
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastModule,
    TransferHttpCacheModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [DatePipe, AsyncPipe, DialogService, MessageService, ConfirmationService, interceptorProviders],
  // providers: [DatePipe, AsyncPipe, DialogService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
