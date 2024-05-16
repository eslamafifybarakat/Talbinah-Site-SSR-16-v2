import { environment } from './../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { roots } from '../shared/configs/endPoints';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  apiUrl: string = environment?.apiUrl;

  blogRelatedArticlesSubj = new BehaviorSubject<any>(null);
  blogRelatedDoctorsSubj = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getAll(page?: any, per_page?: any, category_id?: any): Observable<any> {
    let params = new HttpParams();
    if (page != null) {
      params = params.append('page', page);
    }
    if (per_page != null) {
      params = params.append('per_page', per_page);
    }
    if (category_id != null) {
      params = params.append('category_id', category_id);
    }
    return this.http.get(
      `${this.apiUrl}/${roots?.blogs?.getAll}`, { params: params });
  }
  getBlogById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.blogs?.getAll}/${id}`);
  }
}
