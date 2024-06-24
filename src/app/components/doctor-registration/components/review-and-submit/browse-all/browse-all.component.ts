import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-browse-all',
  templateUrl: './browse-all.component.html',
  styleUrls: ['./browse-all.component.scss']
})
export class BrowseAllComponent {

  isFullLoading: boolean = false;
  data: any;
  items: any = [];

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.data = this.config?.data;
    this.items = this.data?.list
  }

  cancel(): void {
    this.ref.close({ isChangedList: false });
  }
}
