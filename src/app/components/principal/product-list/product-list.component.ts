import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productsTemp: Product[] = [];
  currentUser : any;
  constructor( private productService: ProductService, private loginService : LoginService, private router: Router, private userService : UserService) {}
  isCatCorrecto : boolean;
  categoriaElegida : string ="Todas las categorias";

  escogerCategoria(categoria : string){
    this.categoriaElegida = categoria;
    console.log(categoria);
    this.productsTemp = [];
    this.productsTemp= StringFunctions.FiltraProdByCategoria(this.products,categoria);
    console.log(this.productsTemp);
  }
  ngOnInit(): void {
    this.loadProducts();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    // this.loginService.getAuth().subscribe(user => this.currentUser = user);


  }
  async logout() {

    const { id, dni, nombres, correo, fecCreacion, tipo } = this.currentUser;
      const user = {
        dni,
        nombres,
        correo,
        fecCreacion,
        estado: false,
        tipo
      };
      await this.userService.updateUser(id, user);
      localStorage.setItem('user', null);
    this.loginService.logout().then(() => this.router.navigate(["/login"]));
  }
  loadProducts(): void {
    this.productService.getProductos().subscribe((productoCambio)=>{
    this.products = [];
    this.productsTemp = [];
    productoCambio.forEach((producto)=>{
      this.products.push({  
        $key: producto.payload.doc.id,
        ...producto.payload.doc.data()
      })
      this.productsTemp.push({  
        $key: producto.payload.doc.id,
        ...producto.payload.doc.data()
      })
    })
    })
  }
  VerificarCat(product : Product, tipo: string ){
    
    if(product.categoria === tipo){
      this.isCatCorrecto = true;
    }else{
      this.isCatCorrecto = false;
    }

  }


}
