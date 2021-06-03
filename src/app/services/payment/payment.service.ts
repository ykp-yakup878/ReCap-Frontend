import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getPaymnets() {
    let newPath = this.apiUrl + '/fakecards/getall';
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
}
