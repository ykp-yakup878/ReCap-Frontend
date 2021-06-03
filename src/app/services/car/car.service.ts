import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/car/cardetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/car/getcarsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + '/car/getcarsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsFilter(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl +
      '/car/getcarsfilter?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarImageDetail(
    carId: number
  ): Observable<ListResponseModel<CarImageDetail>> {
    let newPath = this.apiUrl + '/car/getcarimagedetail?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(newPath);
  }
  carAdd(car: Car) {
    let newPath = this.apiUrl + '/car/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  carUpdate(car: Car) {
    let newPath = this.apiUrl + '/car/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  carDelete(car:CarDetail){
    let newPath=this.apiUrl+"/car/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
}
