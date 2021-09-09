import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import { Router } from '@angular/router';
import { HtmlAstPath } from '@angular/compiler';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  products: Product[] = [];
  productsNovedades : Product [] = [
    // new Product(9,'Suplemento Poder','Suplemento', 'lorem ipsum', 89.99, 'https://img4.localgymsandfitness.com/619/345/2340358896193452.jpg','Novedades',70),
    // new Product(10,'Suplemento Potencial', 'Suplemento', 'lorem ipsum', 59.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3D8I4pomyaFiYMR-ycchh7T5yun3JYHwxQ&usqp=CAU','Novedades',58),
    // new Product(11,'Suplemento Musculo', 'Suplemento', 'lorem ipsum', 77.99, 'https://sc01.alicdn.com/kf/Hd8f8cb1113ea4c978c5c6b0756535645N.jpg','Novedades',47),
    // new Product(12,'Suplemento Esteroiden', 'Suplemento', 'lorem ipsum', 84.99, 'https://img4.localgymsandfitness.com/619/345/2340358896193452.jpg','Novedades',58),
  ];
  isTipoCorrecto: boolean;
  isCatCorrecta : boolean;
  productoModal : any = [];
  pageActual:number = 1;
  constructor( private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getProductos().subscribe((productoCambio)=>{
    this.products = [];
    productoCambio.forEach((producto)=>{
      this.products.push({  
        $key: producto.payload.doc.id,
        ...producto.payload.doc.data()
      })
    })
    })
  }
  loadNewProducts() : void{
    // console.log('cargando productos nuevos');
    this.productsNovedades = this.products.slice(5,9);  // Orden de productos
  }

  mostrarLogin(){
  
    let btnClose = document.querySelector("#close") as HTMLButtonElement;
    this.router.navigate(["/login"]);
    btnClose.click();
  }

  // VERIFICAR SI ES PRODUCTO NOVEDAD, DE VENTA, ETC 
  VerificarTipo(producto : Product, tipo : string){ 
      if(producto.tipo == tipo){
            this.isTipoCorrecto = true;
      }else{
          this.isTipoCorrecto = false;
      }
  }
  
  VerificarCategoria(producto : Product, cat : string){ 
    if(producto.tipo == cat){
          this.isTipoCorrecto = true;
    }else{
        this.isTipoCorrecto = false;
    }
  }
  MostrarModal(id : number):void{
    
    let producto = StringFunctions.BuscarProducto(id,this.products);
    this.productoModal = {...producto};
  
  }
}
