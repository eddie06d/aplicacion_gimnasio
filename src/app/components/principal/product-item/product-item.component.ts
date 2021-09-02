import { MessageService } from '../../../services/message.service';
import { Product } from '../../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
  addToCart(): void {
    this.messageService.sendMessage(this.product);
    Swal.fire({
      icon: 'success',
      title: 'Agregado exitosamente al carrito',
      text: 'Producto: '+ (this.product.nombre),
      showConfirmButton: false,
      timer: 1500
    })
  }
  
}
