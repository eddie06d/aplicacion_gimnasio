import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';
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


  }
  mostrar(){
    if(this.showcontent!=true){
      this.showcontent=true;
    }else{
      this.showcontent=false;
    }
  }

  handleImage(e): void {
    this.image = e.target.files[0];
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