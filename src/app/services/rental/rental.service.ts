import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44366/api'
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+'/rental/getall'
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+'/rental/getrentaldetails'
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
}
