import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { StringFunctions } from 'src/app/helpers/StringFunctions';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-products',
  templateUrl: './gestion-products.component.html',
  styleUrls: ['./gestion-products.component.css']
})
export class GestionProductsComponent implements OnInit {
  cssUrl: string;
  showcontent: boolean=true;
  image: string = '';
  urlDownload: string = '';
  products: Product[] = [];
  productsTemp: Product[] = [];


  filterprod='';
  formEdit: FormGroup = new FormGroup({
    precio: new FormControl(null, [Validators.required]),
    stock: new FormControl(null, [Validators.required])
  });
  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl(null, [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    stock: new FormControl(null, [Validators.required])
  });
  constructor(public sanitizer: DomSanitizer, private productService: ProductService){
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
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
  fitradoTotalCategoria(){
    this.productsTemp = [];
    this.productsTemp= StringFunctions.FiltraProd(this.products);
    console.log(this.productsTemp);
  }
  escogerCategoria(categoria : string){
    console.log(categoria);
    this.productsTemp = [];
    this.productsTemp= StringFunctions.FiltraProdByCategoria(this.products,categoria);
    console.log(this.productsTemp);
  }
  mostrar(){
    if(this.showcontent!=true){
      this.showcontent=true;
    }else{
      this.showcontent=false;
    }
  }
  filtrado(e): void {
    const categoria = e.target.value;
    switch(categoria) {
      case '':
        this.fitradoTotalCategoria();
        break;
      case '1':
        this.escogerCategoria('Articulos y accesorios');
        break;
      case '2':
        this.escogerCategoria('Pesas y barras');
        break;
      case '3':
        this.escogerCategoria('Máquinas y bancas');
        break;
      case '4':
        this.escogerCategoria('Suplementos');
        break;
    }
  }
  handleImage(e): void {
    this.image = e.target.files[0];
  }
  selectEditProd(prod : Product) {
    
    //this.onEditProd();
  }
 async onEditProd(codigo: string){
    //this.productService.updateProduct(codigo,{ ...this.formEdit.value,fecCreacion: new Date().toLocaleDateString()}).then(() => 
    Swal.fire({
      icon: 'success',
      title: 'Actualizado producto',
      showConfirmButton: false,
      timer: 1500
    })
  //); 
  }
async onDeleteProd(codigo: string){
  Swal.fire({
    title: '¿Estas seguro de eliminar el producto?',
    text: "!No podra recuperar el producto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '!Si, deseo eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.deleteProduct(codigo);
      Swal.fire(
        'Eliminado!',
        'Producto Eliminado!!',
        'success'
      )
    }
  })
  }
  async enviarProducto() {
    if(this.showcontent) {
      let imageUrl = (document.querySelector("#img-url") as HTMLInputElement).value;
      this.productService.createProduct({ ...this.form.value, image: imageUrl, fecCreacion: new Date().toLocaleDateString() }).then(() =>  
        Swal.fire({
          icon: 'success',
          title: 'Producto subido por url',
          showConfirmButton: false,
          timer: 1500
        })
      );  
    } else {
      this.urlDownload = await this.productService.uploadImage(this.image);
      this.productService.createProduct({ ...this.form.value, image: this.urlDownload, fecCreacion: new Date().toLocaleDateString() }).then(() => 
        Swal.fire({
          icon: 'success',
          title: 'Producto subido de forma local',
          showConfirmButton: false,
          timer: 1500
        })
      ); 
    }
    //this.form.reset();
  } 

  
}