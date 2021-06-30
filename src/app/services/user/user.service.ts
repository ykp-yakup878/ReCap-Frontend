import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from 'src/app/models/claim';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  GetUser(email:any){
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+'/users/email?email='+email)
  }
  GetClaims(userId:number){
    return this.httpClient.get<ListResponseModel<Claim>>(this.apiUrl+'/users/getclaims?userId='+userId)
  }
}
