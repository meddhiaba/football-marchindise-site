import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let stateConnexion = localStorage.getItem('state');
  if(stateConnexion=="connected")
  return true;
  else{
  router.navigate(['/login']);
  return false;
  }
  };
