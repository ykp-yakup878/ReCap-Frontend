import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  @Input() carForUpdate: CarDetail;
  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      _description: ['', Validators.required],
    });
  }

  carUpdate() {
    if (this.carUpdateForm.valid) {
      let carModel: Car = Object.assign({}, this.carUpdateForm.value);
      carModel.carId = this.carForUpdate.carId;
      this.carService.carUpdate(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (responseError) => {
          if (responseError.error.Errors.length >= 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('', 'Boş Alan Bırakmayınız!');
    }
  }
  getBrands() {
    this.brandService.getBrands().subscribe((respone) => {
      this.brands = respone.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((respone) => {
      this.colors = respone.data;
    });
  }
  refresh() {}
}
