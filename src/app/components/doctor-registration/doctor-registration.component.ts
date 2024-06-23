import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfessionalDataComponent } from './components/professional-data/professional-data.component';

@Component({
  standalone: true,
  imports: [CommonModule, PersonalInfoComponent, ProfessionalDataComponent],
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent {
  steps: any = [
    {
      id: 1,
      title: '١.البيانات الشخصية',
      icon: 'fas fa-user',
      isSelected: true,
    },
    {
      id: 2,
      title: '٢.البيانات المهنية',
      icon: 'fas fa-pen',
      isSelected: false,
    },
    {
      id: 3,
      title: '٣.الشهادات والخبرات',
      icon: 'fas fa-user-edit',
      isSelected: false,
    },
    {
      id: 4,
      title: '٤.إرسال و مراجعة',
      icon: 'fas fa-handshake',
      isSelected: false,
    }
  ];
  stepNum: number = 2;

  submitPersonalInfo(item): void {
    console.log(item);
    this.stepNum = 2;
  }
}
