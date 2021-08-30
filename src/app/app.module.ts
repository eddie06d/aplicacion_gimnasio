import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//imports from Angular-Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
/*import * as firebase from 'firebase/app';*/

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { PantallaCartComponent } from './components/pantalla-cart/pantalla-cart.component';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';

import { HomeAdminComponent } from './components/interfaz-admin/home-admin/home-admin.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { AdminProfileComponent } from './components/interfaz-admin/admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    PrincipalComponent,
    ProductListComponent,
    CartComponent,
    ProductItemComponent,
    PantallaCartComponent,
    HomeAdminComponent,
    InterfazAdminComponent,
    AdminProfileComponent,
    HeaderPrincipalComponent,
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firestore),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    //NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
