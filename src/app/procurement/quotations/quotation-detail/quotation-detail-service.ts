import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/auth/auth.interface';
import { QuotationDetailCreateRequestDTO, QuotationDetailItem, QuotationDetailReadByQuoatationRequestDTO, QuotationDetailUpdateRequestDTO, RfqItem, RfqItemDropdownRequest } from './quoatation-detail-interface';
import { ApiEndpoints } from '../../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuoatationDetailService {

  http = inject(HttpClient);

  Create(data: QuotationDetailCreateRequestDTO): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(ApiEndpoints.QuotationItem.Create, data)
  }

  Update(data: QuotationDetailUpdateRequestDTO): Observable<ApiResponse<object>> {
    return this.http.put<ApiResponse<object>>(ApiEndpoints.QuotationItem.Update, data)
  }

  Delete(data: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${ApiEndpoints.QuotationItem.Delete}/${data}`)
  }

  ReadAll(): Observable<ApiResponse<object>> {
    return this.http.get<ApiResponse<QuotationDetailItem[]>>(ApiEndpoints.QuotationItem.Delete)
  }

  ReadbyId(data: number): Observable<ApiResponse<QuotationDetailItem>> {
    return this.http.get<ApiResponse<QuotationDetailItem>>(`${ApiEndpoints.QuotationItem.ReadById}/${data}`)
  }

  ReadByQuoatationId(data: QuotationDetailReadByQuoatationRequestDTO): Observable<ApiResponse<QuotationDetailItem[]>> {
    return this.http.get<ApiResponse<QuotationDetailItem[]>>(ApiEndpoints.QuotationItem.ReadByQuotationId, { params: { ...data } })
  }

  RfqItemDropdown (data: RfqItemDropdownRequest): Observable<ApiResponse<RfqItem[]>> {
    return this.http.get<ApiResponse<RfqItem[]>>(ApiEndpoints.RFQItem.ReadByRFQId, { params: { ...data } })
  }



}
