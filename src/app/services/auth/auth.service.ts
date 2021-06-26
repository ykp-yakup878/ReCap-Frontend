import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/auth/login",user)
  }
  register(user:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/auth/register",user)
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true
    }
    else{
      return false
    }
  }
}
