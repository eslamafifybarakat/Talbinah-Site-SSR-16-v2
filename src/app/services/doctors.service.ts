import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { roots } from '../shared/configs/endPoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  apiUrl: string = environment?.apiUrl;
  reviewsDoctorSubj = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getAll(page?: any, per_page?: any, search?: any, start_price?: any, end_price?: any, gender?: any, specialist_id?: any, top_rated?: any): Observable<any> {
    let params = new HttpParams();
    if (page != null) {
      params = params.append('page', page);
    }
    if (per_page != null) {
      params = params.append('per_page', per_page);
    }
    if (search != null) {
      params = params.append('search', search);
    }
    if (start_price != null) {
      params = params.append('start_price', start_price);
    }
    if (end_price != null) {
      params = params.append('end_price', end_price);
    }
    if (gender != null) {
      params = params.append('gender', gender);
    }
    if (specialist_id != null) {
      params = params.append('specialist_id', specialist_id);
    }
    if (top_rated != null) {
      params = params.append('top_rated', top_rated);
    }
    return this.http.get(
      `${this.apiUrl}/${roots?.doctors?.getAll}`, { params: params });
  }
  getDoctorById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.doctors?.getAll}/${id}`);
  }
  joinUs(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roots?.doctors?.joinUs}`, data);
  }
  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.doctors?.countries}`);
  }
  getSpecialists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.doctors?.getSpecialists}`);
  }
}
