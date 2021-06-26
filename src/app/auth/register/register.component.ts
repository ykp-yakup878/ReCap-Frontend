import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.CreateRegisterForm();
    
  }

  CreateRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  Register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (respone) => {
          console.log(respone);

          this.toastrService.success('', 'Kayıt Olundu');
        },
        (responseError) => {
          console.log(responseError);

          this.toastrService.error('', responseError.error);
        }
      );
    }else{
      this.toastrService.error('','Boş Alan Bırakmayınız!')
    }
  }
  LoginRoute(){
    this.router.dispose
    this.router.navigate(['auth/login'])
  }
}
