import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private toastrService:ToastrService,
    private router:Router
  ){  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      let role=JSON.parse(localStorage.getItem("role")||'{}')
      for (let i = 0; i < role.length; i++) {
        if (role[i].name==="admin") {
          return true
        }
      }
      this.toastrService.error("","Yetki Yok")
      this.router.navigate(["/auth/login"])
      return false
  }
}
