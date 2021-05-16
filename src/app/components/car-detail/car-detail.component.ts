import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImageDetails:CarImageDetail[]=[]
  carDto:CarImageDetail
  carImageBasePath='https://localhost:44366'
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarImageDetail(params["carId"])
    })
  }

  getCarImageDetail(carId:number){
    this.carService.getCarImageDetail(carId).subscribe(response=>{
      this.carImageDetails=response.data,
      this.carDto=response.data[0]
    })
  }
}
