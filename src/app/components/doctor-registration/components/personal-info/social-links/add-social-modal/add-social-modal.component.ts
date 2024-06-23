import { PublicService } from 'src/app/services/generic/public.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule, CommonModule],
  selector: 'app-add-social-modal',
  templateUrl: './add-social-modal.component.html',
  styleUrls: ['./add-social-modal.component.scss']
})
export class AddSocialModalComponent implements OnInit {

  socialOptions: any = [];
  dataModal: any;
  isEdit: Boolean = false;
  item: any;

  addSocialForm: any = this.formBuilder.group(
    {
      name: [null, { validators: [Validators.required] }],
      link: ['', { validators: [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')], updateOn: "blur" }],
    },
  );
  get addSocialFormControls(): any {
    return this.addSocialForm?.controls;
  }

  constructor(
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.socialOptions = this.publicService.getSocialOptions();
    this.dataModal = this.config?.data;
    if (this.dataModal?.isEdit) {
      this.isEdit = true;
      this.item = this.dataModal?.el;
      this.addSocialForm.patchValue({
        name: this.item?.name,
        link: this.item?.link
      });
    }
  }

  addLink(): void {
    if (this.addSocialForm?.valid) {
      this.ref.close({ item: this.addSocialForm?.value });
    } else {
      this.publicService?.validateAllFormFields(this.addSocialForm);
    }
  }
  onNoClick(): void {
    this.ref.close();
  }
}
