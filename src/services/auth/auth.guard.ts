import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public local: LocalStorageService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.local.retrieve('user_info'));
      if(this.local.retrieve('user_info')){
        return true;
      }else{
        this.router.navigate(['/business']);
      }
  }
}
