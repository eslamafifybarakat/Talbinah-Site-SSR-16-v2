import { PublicService } from 'src/app/services/generic/public.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ImageModule],
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
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }

  browseAll(type?: any): void { }
  backStep(): void {
    this.back?.emit(3);
  }

  registerNow(): void {
    this.sendNow?.emit();
  }
}
