import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GrnCreateRequestDTO, grnItemDTO, GrnUpdateRequestDTO } from './grn-receipt-interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/auth/auth.interface';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class GrnReceiptService {
  
  http = inject(HttpClient);

  Create(data : GrnCreateRequestDTO) : Observable<ApiResponse<null>>{
    return this.http.post<ApiResponse<null>>(ApiEndpoints.GRN.Create, data)
  }
  
  Update(data : GrnUpdateRequestDTO) : Observable<ApiResponse<null>>{
    return this.http.put<ApiResponse<null>>(ApiEndpoints.GRN.Update, data)
  }

  Delete(id : number) : Observable<ApiResponse<null>>{
    return this.http.delete<ApiResponse<null>>(`${ApiEndpoints.GRN.Delete}/${id}`)
  }

  ReadbyId(id : number) : Observable<ApiResponse<grnItemDTO>>{
    return this.http.get<ApiResponse<grnItemDTO>>(`${ApiEndpoints.GRN.ReadById}/${id}`)
  }

  ReadAll() : Observable<ApiResponse<grnItemDTO[]>>{
    return this.http.get<ApiResponse<grnItemDTO[]>>(ApiEndpoints.GRN.ReadAll)
  }

}
