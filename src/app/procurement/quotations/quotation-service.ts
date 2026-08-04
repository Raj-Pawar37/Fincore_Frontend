import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiEndpoints } from '../../../api-endpoints';
import { ApiResponse } from '../../core/models/api-response.interface';

import { Quotation, QuotationComparisonResponse, QuotationCreateRequest, QuotationPaginationRequest, QuotationUpdateRequest, VendorRfqDropdown } from './quotation-interface';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly http = inject(HttpClient);

  create(request: QuotationCreateRequest): Observable<ApiResponse<Quotation>> {
    return this.http.post<ApiResponse<Quotation>>(ApiEndpoints.Quotation.Create, request);
  }

  update(request: QuotationUpdateRequest): Observable<ApiResponse<Quotation>> {
    return this.http.put<ApiResponse<Quotation>>(ApiEndpoints.Quotation.Update, request);
  }

  readAll(request: QuotationPaginationRequest): Observable<ApiResponse<Quotation[]>> {

    const params = new HttpParams()
      .set('VendorId', request.vendorId.toString())
      .set('PageNumber', request.pageNumber.toString())
      .set('PageSize', request.pageSize.toString())
      .set('Search', request.search)
      .set('Status', request.status);
    return this.http.get<ApiResponse<Quotation[]>>(ApiEndpoints.Quotation.ReadAll, { params });
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

  getDropdown(searchText: string = '', vendorId: number = 0, status: string = ''): Observable<ApiResponse<VendorRfqDropdown[]>> {
    const params = new HttpParams()
      .set('searchText', searchText)
      .set('vendorId', vendorId)
      .set('status', status);
    return this.http.get<ApiResponse<VendorRfqDropdown[]>>(`${ApiEndpoints.RFQ.dropdown}`, { params });
  }


  readComparison(rfqId: number): Observable<ApiResponse<QuotationComparisonResponse>> {
    return this.http.get<ApiResponse<QuotationComparisonResponse>>(`${ApiEndpoints.Quotation.getQuotationComparsion}/${rfqId}`);
  }

}