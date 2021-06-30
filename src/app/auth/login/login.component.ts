import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  localUserEmail:string|null=localStorage.getItem('email');
  user:User
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success('', response.message);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email',this.loginForm.value.email)

          this.userService.GetUser(this.loginForm.value.email).subscribe(response=>{
            this.userService.GetClaims(response.data.id).subscribe(claim=>{
              console.log(claim.data);
              localStorage.setItem('role',JSON.stringify(claim.data))
            })
          })
          // this.userService.GetClaims(this.user.id).subscribe(response=>{
          //   console.log(response);
            
          // })
          setTimeout(() => {
            this.router.navigate(['admin/cars']);
          }, 100);
          
        },
        (responseError) => {
          this.toastrService.error('', responseError.error);
        }
      );
    } else {
      this.toastrService.error('', 'Boş Alan Bırakmayınız!');
    }
  }
  // click(){
  //   let role=JSON.parse(localStorage.getItem('role')||'{}')
  //   // console.log(JSON.parse(localStorage.getItem('role')||'{}'));
  //   for (let i = 0; i < role.length; i++) {
  //    console.log(role[i].name);
      
  //   }
  // }
}
