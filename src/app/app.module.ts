import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { PantallaCartComponent } from './components/pantalla-cart/pantalla-cart.component';

/* external
import { NgxPayPalModule } from 'ngx-paypal';*/

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    //NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
