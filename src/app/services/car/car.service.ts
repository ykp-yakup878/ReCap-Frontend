import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarDetail } from 'src/app/models/carDetail';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44366/api/car/cardetail';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl);
  }
}
