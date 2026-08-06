import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaymentCreateRequestDTO, PaymentItemDTO, PaymentUpdateRequestDTO } from './payment-interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/auth/auth.interface';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
 
  
  http = inject(HttpClient);


  Create(data : PaymentCreateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.Payment.Create, data)
  }
  Update(data : PaymentUpdateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(ApiEndpoints.Payment.Update, data)
  }
  Delete(id : number) : Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.Payment.Delete}/${id}`)
  }
  ReadById(id : number) : Observable<ApiResponse<PaymentItemDTO>> {
    return this.http.get<ApiResponse<PaymentItemDTO>>(`${ApiEndpoints.Payment.ReadById}/${id}`)
  }
  ReadAll() : Observable<ApiResponse<PaymentItemDTO[]>> {
    return this.http.get<ApiResponse<PaymentItemDTO[]>>(ApiEndpoints.Payment.ReadAll,)
  }



  ReadByMasterType(data : PaymentCreateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.Payment.Create, data)
  }
  



}
