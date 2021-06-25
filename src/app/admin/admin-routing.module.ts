import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { AdminComponent } from './admin.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'cars',
        component: CarComponent,
      },
      {
        path: 'cars/add',
        component: CarAddComponent,
      },
      {
        path: 'cars/brand/:brandId',
        component: CarComponent,
      },
      {
        path: 'cars/color/:colorId',
        component: CarComponent,
      },
      {
        path: 'cars/carDetail/:carId',
        component: CarDetailComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'rentals',
        component: RentalComponent,
      },
    ],
  },
  {
    path:'auth',
    redirectTo:'/auth',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
