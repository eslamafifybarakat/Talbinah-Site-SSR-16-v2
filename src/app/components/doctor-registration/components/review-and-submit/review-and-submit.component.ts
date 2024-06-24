import { PublicService } from 'src/app/services/generic/public.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowseAllComponent } from './browse-all/browse-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ImageModule
  ],
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.scss']
})
export class ReviewAndSubmitComponent {
  @Output() sendNow = new EventEmitter();
  @Output() back = new EventEmitter();
  currentLanguage: string = '';
  doctorImg: any;
  @Input() data: any;

  constructor(
    public publicService: PublicService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }

  browseAll(type: any): void {
    let header;
    let items: any = []
    if (type == 'parentCategory') {
      header = 'التخصصات';
      items = { list: this.data?.certificationData?.parentCategory, key: 'name' };
    }
    const ref = this.dialogService?.open(BrowseAllComponent, {
      data: items,
      header: header,
      dismissableMask: false,
      width: '50%'
    });

    ref.onClose.subscribe((res: any) => {

    });
  }

  backStep(): void {
    this.back?.emit(3);
  }

  registerNow(): void {
    this.sendNow?.emit();
  }
}
