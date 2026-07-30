import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiEndpoints } from '../../../api-endpoints';
import { ApiResponse } from '../../core/models/api-response.interface';

import {Quotation, QuotationCreateRequest, QuotationUpdateRequest } from './quotation-interface';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly http = inject(HttpClient);

  create(request: QuotationCreateRequest): Observable<ApiResponse<Quotation>> {
    return this.http.post<ApiResponse<Quotation>>(ApiEndpoints.Quotation.Create,request);
  }

  update(request: QuotationUpdateRequest): Observable<ApiResponse<Quotation>> {
    return this.http.put<ApiResponse<Quotation>>(ApiEndpoints.Quotation.Update,request);
  }

  readAll(): Observable<ApiResponse<Quotation[]>> {
    return this.http.get<ApiResponse<Quotation[]>>(ApiEndpoints.Quotation.ReadAll);
  }

  readById(quotationId: number): Observable<ApiResponse<Quotation>> {
    return this.http.get<ApiResponse<Quotation>>(`${ApiEndpoints.Quotation.ReadById}/${quotationId}`);
  }

  readByRfqId(rfqId: number): Observable<ApiResponse<Quotation[]>> {
    return this.http.get<ApiResponse<Quotation[]>>(`${ApiEndpoints.Quotation.ReadByRfqId}/${rfqId}`);
  }

  delete(quotationId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.Quotation.Delete}/${quotationId}`);
  }


  
}