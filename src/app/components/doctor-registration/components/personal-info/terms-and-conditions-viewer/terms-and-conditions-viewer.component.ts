import { PublicService } from './../../../../../services/generic/public.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule],
  selector: 'app-terms-and-conditions-viewer',
  templateUrl: './terms-and-conditions-viewer.component.html',
  styleUrls: ['./terms-and-conditions-viewer.component.scss']
})
export class TermsAndConditionsViewerComponent implements OnInit {
  @ViewChild('endOfPage', { static: true }) endOfPage: ElementRef | undefined;
  @ViewChild('topOfPage', { static: true }) topOfPage: ElementRef | undefined;

  isScrolledToBottom: boolean = false;

  pdfSrc = '../../../../assets/image/MedJol Terms of Use & Privacy Policy.pdf';

  constructor(
    private publicService: PublicService,
    private sanitizer: DomSanitizer,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    console.log(this.ref);
    // this.publicService.closeModal.subscribe((res: any) => {
    //   if (res == true) {
    //     this.ref?.close();
    //   }
    // });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  agree(): void {
    this.ref.close({ isAgree: true });
  }
  reject(): void {
    this.ref.close({ isAgree: false });
  }
  scrollToEnd(): void {
    if (this.isScrolledToBottom) {
      this.topOfPage?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.isScrolledToBottom = !this.isScrolledToBottom;
    } else {
      this.endOfPage?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.isScrolledToBottom = !this.isScrolledToBottom;
    }
  }
}
