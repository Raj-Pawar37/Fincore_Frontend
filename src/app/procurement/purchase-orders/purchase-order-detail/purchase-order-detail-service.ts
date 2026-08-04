import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PurchaseOrdeDetailCreateRequestDTO, PurchaseOrdeDetailUpdateRequestDTO, PurchaseOrderDetailItem } from './purchase-order-detail-interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/auth/auth.interface';
import { ApiEndpoints } from '../../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderDetailService {
  
  private readonly http = inject(HttpClient);


  Create(data : PurchaseOrdeDetailCreateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.PurchaseOrderDetail.Create, data)
  }

  Update(data : PurchaseOrdeDetailUpdateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(ApiEndpoints.PurchaseOrderDetail.Update, data)
  }

  Delete(id : number) : Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.PurchaseOrderDetail.Delete}/${id}`)
  }

  ReabyId(id : number) : Observable<ApiResponse<PurchaseOrderDetailItem>> {
    return this.http.get<ApiResponse<PurchaseOrderDetailItem>>(`${ApiEndpoints.PurchaseOrderDetail.ReadById}/${id}`)
  }

  ReabyPurchaseOrderId(id : number) : Observable<ApiResponse<PurchaseOrderDetailItem[]>> {
    return this.http.get<ApiResponse<PurchaseOrderDetailItem[]>>(`${ApiEndpoints.PurchaseOrderDetail.ReadByPurchaseOrderId}/${id}`)
  }

  ReadAll() : Observable<ApiResponse<PurchaseOrderDetailItem[]>> {
    return this.http.get<ApiResponse<PurchaseOrderDetailItem[]>>(ApiEndpoints.PurchaseOrderDetail.ReadAll)
  }


  dropdown() : Observable<ApiResponse<null>> {
    return this.http.get<ApiResponse<null>>(ApiEndpoints.PurchaseOrderDetail.dropdown)
  }


}
