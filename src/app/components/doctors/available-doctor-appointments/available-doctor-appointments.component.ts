import { DownloadAppsComponent } from './../../../shared/components/download-apps/download-apps.component';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { Component, Input, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { keys } from './../../../shared/configs/localstorage-key';
import { DatePipe, isPlatformBrowser, CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

import { extendMoment } from "moment-range";
import * as Moment from "moment";
import { TranslateModule } from '@ngx-translate/core';
const moment = extendMoment(Moment);

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  selector: 'app-available-doctor-appointments',
  templateUrl: './available-doctor-appointments.component.html',
  styleUrls: ['./available-doctor-appointments.component.scss'],
  providers: [DialogService]
})
export class AvailableDoctorAppointmentsComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  @Input() data: any;

  isloading: boolean = false;
  isloadingCalender: boolean = false;
  preDisable: boolean = true;

  date = moment();
  startDate: any;
  endDate: any;
  dates: any = [];
  appointmentDay: any = [];
  selectAppointmentItem: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only execute this code on the browser
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
      // ... [rest of the browser-specific initialization code]
    }
    // this.data?.appointments.forEach(element => {
    //   console.log(element);
    //   let appointment: any = {
    //     available: 0,
    //     day_id: element?.day_id,
    //     start_end: element?.start_time + ' - ' + element?.end_time,
    //     duration: '30',
    //     selected: true
    //   }
    //   this.appointmentDay.push(appointment);
    //   console.log(appointment);
    // });

    this.dateChanged(this.date);
  }

  dateChanged(date: any) {
    this.isloading = true;
    this.startDate = date;
    this.endDate = date.clone().add(2, "days");
    this.dates = Array.from(
      moment.range(this.startDate, date.clone().add(2, "days")).by("day")
    );
    // console.log(this.startDate);
    // console.log(this.endDate);

    this.getAppointmentDoctor(this.startDate.format("YYYY-MM-DD"), this.endDate.format("YYYY-MM-DD"));
  }
  getAppointmentDoctor(from: any, to: any): void {
    this.appointmentDay = [
      {
        available: 0,
        start_end: '10:00 AM - 12:00 PM',
        duration: '15',
        selected: true
      },
      {
        available: 0,
        start_end: '10:00 AM - 12:00 PM',
        duration: '15'
      },
      {
        available: 7,
        start_end: '10:00 AM - 12:00 PM',
        duration: '15'
      },
      {
        available: 0,
        start_end: '10:00 AM - 12:00 PM',
        duration: '15'
      }
    ];
    if (this.selectAppointmentItem?.length > 0) {
      this.selectAppointmentItem?.forEach((sel: any) => {
        if (this.appointmentDay[sel?.date]) {
          this.appointmentDay[sel?.date]?.forEach((appo: any) => {
            if (sel?.id == appo?.id) {
              appo["selected"] = true;
            }
          });
        }
      });
    }
    // console.log(this.appointmentDay);
  }
  next(): void {
    this.preDisable = false;
    let start = moment(this.endDate, "YYYY-MM-DD").add(1, "days");
    this.dateChanged(start);
    this.cdr?.detectChanges();
  }
  previous(): void {
    let start = this.startDate.clone().subtract(3, "days");
    let end = this.startDate.clone().subtract(1, "days");
    this.startDate = start;
    this.endDate = end;

    if (moment(this.startDate).isBefore(this.datepipe.transform(new Date(), "YYYY-MM-dd"))) {
      this.preDisable = true;
      this.cdr?.detectChanges();

    } else {
      this.preDisable = false;
      this.dates = Array.from(
        moment.range(this.startDate, this.endDate).by("day")
      );
      this.getAppointmentDoctor(
        this.startDate.format("YYYY-MM-DD"),
        this.endDate.format("YYYY-MM-DD")
      );
      this.cdr?.detectChanges();
    }

  }

  selectRow(res: any): void {
    // if (this.selectAppointmentItem?.length > 0 && res?.available === 0) {
    //   if (res["selected"]) {
    //     res["selected"] = false;
    //   }
    //   let founded = false;
    //   let el;
    //   this.selectAppointmentItem?.forEach((element: any) => {
    //     if (element?.id === res?.id) {
    //       founded = true;
    //       el = element;
    //       element["selected"] = false;
    //       this.selectAppointmentItem = this.selectAppointmentItem?.filter(
    //         (value: any) => {
    //           return value.id !== res?.id;
    //         }
    //       );
    //       this.cdr.detectChanges();
    //     }
    //   });

    //   if (!founded) {
    //     res["selected"] = true;
    //     this.selectAppointmentItem?.push(res);
    //   }
    // } else {
    //   if (res["selected"]) {
    //     res["selected"] = false;
    //   }
    //   if (res?.available === 0) {
    //     res["selected"] = true;
    //     this.selectAppointmentItem?.push(res);
    //   } else if (res?.available === 7) {
    //     this.alertsService?.openSweetAlert("info", this.publicService.translateTextFromJson('doctorDetails.selected_by_aother'));
    //   } else {
    //     this.alertsService?.openSweetAlert("info", this.publicService.translateTextFromJson('doctorDetails.selected_by_aother'));
    //   }
    // }
  }
  bookNow(): void {
    const ref = this?.dialogService?.open(DownloadAppsComponent, {
      width: '35%',
      styleClass: 'auth-dialog confirm-delete-trip',
      dismissableMask: true,
      data: {}
    });
    ref?.onClose?.subscribe((res: any) => {
      if (res?.isSave == true) {
        // this.publicService?.toggleBodyScroll(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
