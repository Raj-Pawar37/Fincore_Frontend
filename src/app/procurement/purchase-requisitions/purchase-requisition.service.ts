import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../api-endpoints';@Injectable({
  providedIn: 'root'
})
export class PurchaseRequisitionService {
  
  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);

    // CHANGE: 'Search' must be lowercase 'search' to match your .NET API parameters
    if (search) {
      params = params.set('search', search); 
    }

    return this.http.get<any>(ApiEndpoints.PurchaseRequisition.ReadAll, { params });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${ApiEndpoints.PurchaseRequisition.ReadById}/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${ApiEndpoints.PurchaseRequisition.Update}/${id}`, data);
  }

  getDropdown(searchText?: string, departmentId?: number): Observable<any> {
    let params = new HttpParams();
    
    if (searchText) {
      params = params.set('searchText', searchText);
    }
    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }

    return this.http.get<any>(ApiEndpoints.PurchaseRequisition.Dropdown, { params });
  }
}