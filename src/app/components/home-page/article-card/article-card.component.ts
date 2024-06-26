import { PublicService } from './../../../services/generic/public.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Article } from '../../../interfaces/home';
import localeAr from '@angular/common/locales/ar'
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

registerLocaleData(localeAr);

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() item: Article;
  currentLanguage: string = '';

  constructor(
    private publicService: PublicService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

