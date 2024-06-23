import { PublicService } from 'src/app/services/generic/public.service';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSocialModalComponent } from './add-social-modal/add-social-modal.component';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
  @Input() items: any = [];
  @Output() changeSocialLinksHandler = new EventEmitter();
  linksSocial: any = [];

  constructor(
    private dialogService: DialogService,
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    // const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok'];
    // const userSocialsArray: any = [];

    // const user = this.items[0]; // Assuming we are working with the first user in the array

    // socialPlatforms?.forEach(platform => {
    //   if (user[platform]) {
    //     userSocialsArray.push({ name: { id: platform, title: platform }, link: user[platform] });
    //   }
    // });
    // this.linksSocial = userSocialsArray;
  }

  addSocialLink(item?: any): void {
    let termsRef: any;
    if (item) {
      termsRef = this.dialogService?.open(AddSocialModalComponent, {
        data: {
          el: item,
          isEdit: true
        },
        width: '40%',
        dismissableMask: false,
        styleClass: 'custom-modal',
        header: 'تعديل رابطًا اجتماعيًا'//this.publicService.translateTextFromJson('profile.editSocialLink')
      });
    } else {
      termsRef = this.dialogService?.open(AddSocialModalComponent, {
        width: '40%',
        dismissableMask: false,
        styleClass: 'custom-modal',
        header: 'أضف رابطًا اجتماعيًا' //this.publicService.translateTextFromJson('profile.addSocialLink')
      });
    }
    termsRef.onClose.subscribe((result: any) => {
      if (result?.item) {
        if (this.linksSocial?.length === 0) {
          let addedItem = result?.item;
          addedItem["id"] = 1;
          this.linksSocial?.push(addedItem);
        } else {
          let founded;
          let foundedItem;
          this.linksSocial?.filter((value: any, index: any) => {
            if (value?.name === result?.item?.name) {
              founded = true;
              foundedItem = index;
            }
          });
          if (founded !== true) {
            let addedItem = result?.item;
            addedItem["id"] = Math.round(Math.random() * 1000);
            this.linksSocial?.push(addedItem);
          } else {
            this.linksSocial[`${foundedItem}`]["link"] = result?.item?.link;
          }
        }
        this.changeSocialLinksHandler.emit(this.linksSocial);
      }
    });
  }
  removeItemSocial(item: any): void {
    this.linksSocial = this.linksSocial?.filter((value: any) => {
      return value?.name?.id !== item?.name?.id;
    });
    this.changeSocialLinksHandler.emit(this.linksSocial);
  }

}
