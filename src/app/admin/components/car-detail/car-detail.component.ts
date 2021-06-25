import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car/car.service';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/models/customer';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImageDetails: CarImageDetail[] = [];
  customers: Customer[] = [];
  carDto: CarImageDetail;
  imagePath = environment.carImageBasePath;
  rentalAddForm: FormGroup;
  payments: Payment[] = [];
  kartId: number;
  day: any;

  constructor(
    private carService: CarService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private rentalService:RentalService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarImageDetail(params['carId']);
    });
    this.createRentalForm();
    this.getCustomers();
    this.getPayment();
  }

  kartClick(kartId: number) {
    this.kartId = kartId;
  }
  dayClick(){
    let day = (<HTMLInputElement>document.getElementById('day')).value;
    this.day = day;
  }
  createRentalForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
    });
  }
  rentalAdd() {
    if (this.rentalAddForm.valid&&this.day!==""&&this.kartId!==undefined) {
      let rentalModel:Rental= Object.assign({},this.rentalAddForm.value);
      rentalModel.carId=this.carDto.carId
      this.rentalService.renatlAdd(this.day,this.kartId,rentalModel).subscribe(response=>{
        this.toastrService.success("",response.message)
      },responseError=>{
        // console.log(responseError)
        if (responseError.error.message.length>0) {
          this.toastrService.error("",responseError.error.message)
        }
      })
    }else{
      this.toastrService.error("","Boş Alan Bırakmayınız")
    }
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getCarImageDetail(carId: number) {
    this.carService.getCarImageDetail(carId).subscribe((response) => {
      (this.carImageDetails = response.data), (this.carDto = response.data[0]);
    });
  }
  getPayment() {
    this.paymentService.getPaymnets().subscribe((response) => {
      this.payments = response.data;
    });
  }
}
