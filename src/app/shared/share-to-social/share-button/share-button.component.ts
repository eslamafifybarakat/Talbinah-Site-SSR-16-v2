import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
  @Input() type!: 'facebook' | 'twitter' | 'linkedIn' | 'whatsapp' | 'instagram' | 'discard' | 'telegram';
  @Input() shareUrl: any;
  navUrl: any;

  socialBtns = [
    { name: 'facebook', icon: 'facebook' }, { name: 'twitter', icon: 'twitter' }, { name: 'linkedIn', icon: 'linkedin-in' }, { name: 'whatsapp', icon: 'whatsapp' }, { name: 'instagram', icon: 'instagram' }, { name: 'discard', icon: 'discord' }, { name: 'telegram', icon: 'telegram' }
  ]

  ngOnInit(): void {
    this.createNavigationUrl();
  }
  private createNavigationUrl() {
    let searchParams = new URLSearchParams();
    switch (this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://twitter.com/share?' + searchParams;
        break;
      case 'linkedIn':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://linkedIn.com/share?' + searchParams;
        break;
      case 'whatsapp':
        searchParams.set('url', this.shareUrl);
        this.navUrl = ' https://wa.me/?text=' + searchParams;
        break;
      case 'instagram':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://instagram.com/share?' + searchParams;
        break;
      case 'discard':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://discard.com/share?' + searchParams;
        break;
      case 'telegram':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://telegram.me/share/url?text=<' + searchParams + '>';
        break;
    }
  }

  public share() {
    return window.open(this.navUrl, "_blank");
  }
}
