import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-request-card',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './employee-request-card.component.html',
  styleUrls: ['./employee-request-card.component.scss']
})
export class EmployeeRequestCardComponent {
  @Input() item: any;
  @Output() detailsClicked: EventEmitter<any> = new EventEmitter();

  onDetailsClicked(event: any) {
    this.detailsClicked.emit(event);
  }
}
