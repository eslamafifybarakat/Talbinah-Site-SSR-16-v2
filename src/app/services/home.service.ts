import { environment } from './../../environments/environment';
import { roots } from '../shared/configs/endPoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl: string = environment?.apiUrl;

  homeDataServerSubj = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getHomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.homePage?.getData}`);
  }
  contactUs(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roots?.homePage?.contactUs}`, data);
  }
}
