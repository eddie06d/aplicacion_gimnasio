import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminProfileComponent } from './components/interfaz-admin/admin-profile/admin-profile.component';
import { HomeAdminComponent } from './components/interfaz-admin/home-admin/home-admin.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'interfaz-admin', component: InterfazAdminComponent, children: [
    { path: '', redirectTo: 'analytic-dashboard', pathMatch: 'full' },
    { path: 'analytic-dashboard', component: HomeAdminComponent },
    { path: 'admin-profile', component: AdminProfileComponent }
  ] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
