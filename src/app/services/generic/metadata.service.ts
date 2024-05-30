import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { PublicService } from './public.service';

export interface MetaDetails {
  title: string;
  description: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private publicService: PublicService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }

  private createTagObject(tag: { name?: string, property?: string, content: string, scheme?: string }): any {
    const newTag: any = tag.name ? { name: tag.name, content: tag.content } : { property: tag.property, content: tag.content };
    if (tag.scheme) {
      newTag['scheme'] = tag.scheme;
    }
    return newTag;
  }

  addMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  addMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  updateMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  updateMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  removeMetaTagByName(name: string): void {
    this.metaService.removeTag(`name='${name}'`);
  }

  removeMetaTagByProperty(property: string): void {
    this.metaService.removeTag(`property='${property}'`);
  }

  getMetaTagsName(): any {
    return this.metaService.getTags('name');
  }

  getMetaTagsProperty(): any {
    return this.metaService.getTags('property');
  }

  // Update Global Meta According Current Language
  updateMetaAccordingCurrentLanguage(type?: string | null) {
    let metaTags: any;
    // if (type && type == 'placesList') {
    //   metaTags = placesListTags;
    // } else if (type && type == 'eventsList') {
    //   metaTags = placesListTags;
    // }
    // else {
    //   metaTags = defaultTags;
    // }
    const { title, description, hrefLang, href, canonical } = metaTags[this.publicService.getCurrentLanguage()] || metaTags['en'];
    this.updateTitle(title);
    this.updateMetaTagsName([
      { name: 'title', content: title },
      { name: 'description', content: description },
    ]);
    this.updateMetaTagsProperty([
      { property: 'og:url', content: `${environment.publicUrl}/${this.publicService.getCurrentLanguage()}/` },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ]);
    this.updateLinkRelAlternate(hrefLang, href);
    this.updateCanonicalLink(canonical);  // Update canonical link
  }
  updateLinkRelAlternate(hreflang: string, href: string): void {
    // Ensure this only runs in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = this.document.querySelector(`link[rel='alternate'][hreflang='${hreflang}']`);
      if (!link) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    }
  }
  updateCanonicalLink(href: string): void {
    // Ensure this only runs in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    }
  }
}
