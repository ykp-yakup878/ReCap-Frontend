import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './auth/error404/error404.component';
import { LoginGuard } from './guards/login.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'/admin',
        pathMatch:'full'
      },
      {
        path:'admin',
        loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
      }
    ],
    canActivate:[LoginGuard]
  },
  // { path: '', pathMatch: 'full', component: CarComponent },
  // { path: 'cars', component: CarComponent },
  // { path: 'cars/brand/:brandId', component: CarComponent },
  // { path: 'cars/color/:colorId', component: CarComponent },
  // { path: 'customers', component: CustomerComponent },
  // { path: 'rentals', component: RentalComponent },
  // { path: 'cars/carDetail/:carId', component: CarDetailComponent },
  // { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  // { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {path:'**',component:Error404Component}
  // {path:'cars/update/:carId',component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
