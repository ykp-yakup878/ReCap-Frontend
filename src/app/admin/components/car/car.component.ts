import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';

import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataLoaded = false;
  filterText = '';
  filterBrandText = '';
  filterColorText = '';
  brands: Brand[];
  colors: Color[];
  brandId: number;
  colorId: number;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService:ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getFilteredCars(params['brandId'], params['colorId']);
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
      this.getColors();
      this.getBrands();
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(categoryId: number) {
    this.carService.getCarsByBrand(categoryId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      // console.log(response.data);
      this.dataLoaded = true;
    });
  }

  getFilteredCars(brandId: number, colorId: number) {
    // console.log(this.filterBrandText)
    if (brandId == null) {
      this.carService.getCarsByColor(colorId).subscribe((response) => {
        this.cars = response.data;
      });
    } else if (colorId == null) {
      this.carService.getCarsByBrand(brandId).subscribe((response) => {
        this.cars = response.data;
      });
    } else {
      this.carService.getCarsFilter(brandId, colorId).subscribe((response) => {
        this.cars = response.data;
      });
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  tiklandi(){
    this.router.navigate(['/admin/cars/add'],{replaceUrl:true})
    this.toastrService.warning("","Tıklandı",{timeOut:1000})
  }

  carDelete(car:CarDetail){
    this.carService.carDelete(car).subscribe(response=>{
      this.toastrService.error("",response.message)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    })
  }
}