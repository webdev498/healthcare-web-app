import { Injectable }         from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, 
  Route}                    from '@angular/router';
import { Observable }         from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('isLoggedin'))
    {
      return true;
    }
    this.router.navigate(['/security/login'])
  }
}
