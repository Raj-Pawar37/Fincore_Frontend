import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/auth/auth.interface';
import { PurchaseOrderCreateRequestDTO, PurchaseOrderItem, PurchaseOrderUpdateRequestDTO, PurchaseOrderUpdateStatusRequestDTO } from './purchase-order-interface';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
 
  private readonly http = inject(HttpClient);


  Create(data : PurchaseOrderCreateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.PurchaseOrder.Create, data)
  }

  Update(data : PurchaseOrderUpdateRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(`${ApiEndpoints.PurchaseOrder.Update}/${data.purchaseOrderId}`, data)
  }

  Delete(id : number) : Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.PurchaseOrder.Delete}/${id}`)
  }

  ReadById(id : number) : Observable<ApiResponse<PurchaseOrderItem>> {
    return this.http.get<ApiResponse<PurchaseOrderItem>>(`${ApiEndpoints.PurchaseOrder.ReadById}/${id}`)
  }

  ReadAll() : Observable<ApiResponse<PurchaseOrderItem[]>> {
    return this.http.get<ApiResponse<PurchaseOrderItem[]>>(ApiEndpoints.PurchaseOrder.ReadAll)
  }

  StatusUpdate(data : PurchaseOrderUpdateStatusRequestDTO) : Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${ApiEndpoints.PurchaseOrder.Update}/${data.id}`, data)
  }
  


}
