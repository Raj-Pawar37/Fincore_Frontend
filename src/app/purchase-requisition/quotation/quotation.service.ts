import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  QuotationCreateUpdate,
  QuotationsResponse,
} from './quotation.interface';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor(private http: HttpClient) {}

  // ✅ Read all quotations
  readAll(): Observable<QuotationsResponse> {
    return this.http.get<QuotationsResponse>(ApiEndpoints.Quoatation.ReadAll);
  }

  // ✅ Create new quotation
  create(payload: QuotationCreateUpdate): Observable<QuotationsResponse> {
    return this.http.post<QuotationsResponse>(`${ApiEndpoints.Quoatation.Create}`, payload);
  }

  // ✅ Update existing quotation
  update(id: number, payload: QuotationCreateUpdate): Observable<QuotationsResponse> {
    return this.http.put<QuotationsResponse>(`${ApiEndpoints.Quoatation.Update}/${id}`, payload);
  }
}
