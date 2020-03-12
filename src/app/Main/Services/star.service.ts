import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Star } from '../Models/star.model';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  url = 'http://5e55e20836450d001428865d.mockapi.io/star';
  constructor(private http: HttpClient) {}

  getStars(): Observable<any> {
    return this.http.get<Star>(this.url, httpOptions);
  }

  getStar(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<Star>(url, httpOptions);
  }

  createStar(star): Observable<any> {
    return this.http.post<Star>(this.url, star, httpOptions);
  }

  updateStar(star): Observable<any> {
    const url = `${this.url}/${star.id}`;
    return this.http.put(url, star, httpOptions);
  }

  deleteStar(id): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Star>(url, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
