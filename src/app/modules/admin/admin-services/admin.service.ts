import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../services/storage.service';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post<[]>(BASE_URL+"api/admin/category", categoryDto,
      {
        headers: this.getHeaders()
      }
    );
  }

  getHeaders(): HttpHeaders {
    const authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer " + StorageService.getToken()
    );

  }
}
