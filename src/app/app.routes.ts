import { ProductContainerComponent } from './component/product-container/product-container.component';
import { ErrorComponent } from './component/error/error.component';
import { DeleteComponent } from './component/admin/delete/delete.component';
import { AjoutComponent } from './component/admin/ajout/ajout.component';
import { EditComponent } from './component/admin/edit/edit.component';
import { adminGuard } from './auth/admin.guard';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AdminDashboardComponent } from './component/admin/admin.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { AboutComponent } from './component/about/about.component';
import { LoginComponent } from './component/login/login.component';
import { CartComponent } from './component/cart/cart.component';


export const routes: Routes = [
  { path: '',redirectTo:'accueil',pathMatch:'full' },
  { path:'accueil', component: AccueilComponent },
  { path: 'products', component: ProductContainerComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path:'sign-up',component:SignUpComponent},
  { path:'cart',component:CartComponent},
  { path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[adminGuard],
    children : [
      {path:'edit',component:EditComponent},
      {path:'ajout',component:AjoutComponent},
      {path:'delete',component:DeleteComponent},
      {path:'',redirectTo:'ajout',pathMatch:'full'}
    ]
  },
  {path:'**',component:ErrorComponent}
];

