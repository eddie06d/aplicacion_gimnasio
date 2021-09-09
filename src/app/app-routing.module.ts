import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminProfileComponent } from './components/interfaz-admin/admin-profile/admin-profile.component';
import { HomeAdminComponent } from './components/interfaz-admin/home-admin/home-admin.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { LoginComponent } from './components/login/login.component';
import { PantallaCartComponent } from './components/principal/pantalla-cart/pantalla-cart.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomePrincipalComponent } from './components/principal/home-principal/home-principal.component';
import { GestionProductsComponent } from './components/interfaz-admin/gestion-products/gestion-products.component';
import { FinanceDashboardComponent } from './components/interfaz-admin/finance-dashboard/finance-dashboard.component';
import { GestionUsersComponent } from './components/interfaz-admin/gestion-users/gestion-users.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  {path: 'principal', component: PrincipalComponent, children: [
    { path: '', redirectTo: 'home-product', pathMatch: 'full' },
    {path: 'home-product', component: HomePrincipalComponent},
    {path: 'cart', component: PantallaCartComponent},
  ],canActivate:[UserGuard]
},
  { path: 'interfaz-admin', component: InterfazAdminComponent, children: [
    { path: '', redirectTo: 'analytic-dashboard', pathMatch: 'full' },
    { path: 'finance-dashboard', component: FinanceDashboardComponent },
    { path: 'analytic-dashboard', component: HomeAdminComponent },
    { path: 'admin-profile', component: AdminProfileComponent },
    { path: 'gestion-products', component: GestionProductsComponent },
    { path: 'gestion-users', component: GestionUsersComponent },
    { path: '**', redirectTo: 'analytic-dashboard' }
  ],canActivate:[AdminGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
