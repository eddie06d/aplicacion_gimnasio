import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { ProductListComponent } from './components/principal/product-list/product-list.component';
import { CartComponent } from './components/principal/cart/cart.component';
import { ProductItemComponent } from './components/principal/product-item/product-item.component';
import { PantallaCartComponent } from './components/principal/pantalla-cart/pantalla-cart.component';
import { HeaderPrincipalComponent } from './components/principal/header-principal/header-principal.component';
import { HomePrincipalComponent } from './components/principal/home-principal/home-principal.component';

import { HomeAdminComponent } from './components/interfaz-admin/home-admin/home-admin.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { AdminProfileComponent } from './components/interfaz-admin/admin-profile/admin-profile.component';

// PAGINATION
import {NgxPaginationModule} from 'ngx-pagination';
import { GestionProductsComponent } from './components/interfaz-admin/gestion-products/gestion-products.component';

// PARA LAS FORMAS DE PAGO
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    HomePrincipalComponent,
    GestionProductsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    NgxPayPalModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firestore),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
