import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APICreateRequestDTO, APIItem, APIUpadteRequestDTO } from './accounts-payable-interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/auth/auth.interface';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AccountsPayableService {


  private readonly http = inject(HttpClient);


  Create(data: APICreateRequestDTO): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.APInvoice.Create, data)
  }

  Update(data: APIUpadteRequestDTO): Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(ApiEndpoints.APInvoice.Update, data)
  }

  Delete(id : number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.APInvoice.Delete}/${id}`)
  }

  ReadById(id : number): Observable<ApiResponse<APIItem>> {
    return this.http.get<ApiResponse<APIItem>>(`${ApiEndpoints.APInvoice.ReadById}/${id}`)
  }

  ReadAll(): Observable<ApiResponse<APIItem[]>> {
    return this.http.get<ApiResponse<APIItem[]>>(ApiEndpoints.APInvoice.ReadAll)
  }

}
