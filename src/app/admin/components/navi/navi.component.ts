import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:User
  userData:string|null=localStorage.getItem('email');
  constructor(private userService:UserService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.GetUser();
  }
  GetUser(){
    // this.userData=localStorage.getItem('email');
    // let email=localStorage.getItem('email');
    this.userService.GetUser(this.userData).subscribe(response=>{
      this.user=response.data
    })
    // console.log(localStorage.getItem('email'));
    
  }
  LogOut(){
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role')
  }
}
