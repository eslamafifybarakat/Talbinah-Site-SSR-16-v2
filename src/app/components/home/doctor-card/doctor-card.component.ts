import { Doctor } from './../../../interfaces/home';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
  @Input() item: Doctor;

}
