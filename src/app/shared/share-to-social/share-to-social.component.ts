import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShareButtonComponent } from './share-button/share-button.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-share-to-social',
  standalone: true,
  imports: [
    CommonModule,
    ShareButtonComponent
  ],
  templateUrl: './share-to-social.component.html',
  styleUrls: ['./share-to-social.component.scss']
})
export class ShareToSocialComponent {
  public link: string = '';
  isCopied: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.link = this.config?.data?.link ? this.config?.data?.link : '';
  }
  showCopied(): void {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }
}
