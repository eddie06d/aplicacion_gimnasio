import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { StringFunctions } from 'src/app/helpers/StringFunctions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productsTemp: Product[] = [];
  constructor( private productService: ProductService) {}
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
