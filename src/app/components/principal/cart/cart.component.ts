import { StorageService } from '../../../services/storage.service';
import { CartItemModel } from '../../../models/cart-item-model';
import { Product } from '../../../models/product';
import { MessageService } from '../../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { render } from 'creditcardpayments/creditCardPayments';

import Swal from 'sweetalert2';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems = [];
  subtotal=0;
  total = 0;

  formu: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required]),
    correo:new FormControl('', [Validators.required]),
    dir:new FormControl('', [Validators.required]),
    pais: new FormControl({value:'Perú',disabled:'true'}, [Validators.required]),
    dep: new FormControl({value:'Lima',disabled:'true'}, [Validators.required])
  });
  
  constructor(
    private messageService: MessageService,
    private storageService: StorageService
    ) { 
      // render({
      //   id : "#myPaypalButtons",
      //   currency: "USD",
      //   value: '100.00',
      //   onApprove: (details) => { 
      //     alert('Transaction Successfull');
      //   }
      // });
    }

  ngOnInit(): void {
    this.initConfig();
    if (this.storageService.existsCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.subtotal = this.getTotal();
    this.total = this.getTotal();
    console.log(this.cartItems);
  }

   // Para pago con PAYPAL

   public payPalConfig ? : IPayPalConfig;

   private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AUd2qhpfZCCH9Z_9HeaJ1F18Fk-9OrIGa-efk-sYiDSEDIe7d6nwvP9m2uUq16pHFGaJiQxmz76AzOVo',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.getTotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.getTotal().toString()
                        }
                    }
                },
                items: 
                    this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
}
   // -----------------------------------------------------------------------------------
  



  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exists = false;
      this.cartItems.forEach(item => {
        if (item.productId === product.$key) {
          exists = true;
          item.qty++;
        }
      });
      if (!exists) {
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);
      }
      this.subtotal = this.getTotal();
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel) => {
      item = {
        name: it.productName,
        image:it.productImgUrl,
        quantity: it.qty,
        unit_amount: {value: it.productPrice, currency_code: 'EUR'}
      };
      items.push(item);
    });
    return items;
  }

  getTotal(): number {
    let total = 0.0;
    this.cartItems.forEach(item => {
      total += item.qty * item.productPrice;
    });
    return +total.toFixed(2);
  }

  emptyCart(): void {
     Swal.fire({
      title: '¿Estas seguro?',
      text: "¡Eliminaras tus productos del carrito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartItems = [];
        this.subtotal=0.0;
        this.total = 0.0;
        this.storageService.clear();
        Swal.fire(
          '¡Eliminados del carrito!',
          'Tu carrito esta vacio',
          'success'
        )
      }
    })
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.subtotal = this.getTotal();
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
  /* NUEVO CODIGO */
  MenosCant(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--;
    } else {
      this.cartItems[i].qty=0;
    }
    this.subtotal = this.getTotal();
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
  MasCant(i: number): void {
    if (this.cartItems[i].qty >= 0) {
      this.cartItems[i].qty++;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.subtotal = this.getTotal();
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
  
  agregarExtra(valor:boolean){
    this.subtotal = this.getTotal();
    if(valor){
      if( this.subtotal!==0){//SI QUIERE A DOMICILIO
        console.log("10 so mas");
        this.total = this.getTotal();
        this.total =this.total+10.00;
      }else{
        console.log("SUBTOTAL CERO");
        this.total = this.getTotal();
      }
    }else{//SI QUIERE A tienda
      console.log("no hay 10 so ");
      this.total = this.getTotal();
    }
    this.storageService.setCart(this.cartItems);
  }
  cerrarFactura(){
    let btnClose = document.querySelector(".btn-close") as HTMLButtonElement;
    btnClose.click();
  }

  async enviarFactura() {
        Swal.fire({
          icon: 'success',
          title: 'PAGO REALIZADO',
          showConfirmButton: false,
          timer: 1500
        })
       //CERRAR EL MODAL
       this.cerrarFactura();
       //VACEAR EL CARRITO
       this.cartItems = [];
       this.subtotal=0.0;
       this.total = 0.0;
       this.storageService.clear()
    }


}
