import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44366/api'
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+'/customer/getall'
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
