import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  // isLinear=false
  rentalAddForm:FormGroup
  rentalValidForm:FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createRentalAddForm()
  }
  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }
}
