import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  {path:'cars',component:CarComponent},
  {path:'cars/brand/:brandId',component:CarComponent},
  {path:'cars/color/:colorId',component:CarComponent},
  {path:'customers',component:CustomerComponent},
  {path:'rentals',component:RentalComponent},
  {path:'cars/carDetail/:carId',component:CarDetailComponent},
  {path:'cars/filter/:brandId/:colorId',component:CarComponent},
  {path:'cars/add',component:CarAddComponent,canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent}
  // {path:'cars/update/:carId',component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
