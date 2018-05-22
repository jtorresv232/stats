import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {UserService} from './user.service';

@Injectable()
export class AdminAuthService implements CanActivate  {

  constructor(private router: Router, private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route);
    console.log(state);
    const isAdmin = localStorage.getItem('isAdmin');    
    if (isAdmin) {
      return true;
    } else {
    //  this.router.navigate(['login']);
      return false;
    }
  }


}
