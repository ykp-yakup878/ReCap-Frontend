import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarDetail } from 'src/app/models/carDetail';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44366/api';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"/car/cardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/car/getcarsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/car/getcarsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
