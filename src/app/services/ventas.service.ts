import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CartItemModel } from '../models/cart-item-model';

@Injectable({
    providedIn:'root'
})

export class BoletaService{
// addVenta( boleta : CartItemModel, usuario: string){
//     this.db.collection('Ventas').doc().set({
//         "idVenta"    : boleta.productId,
//         "producto"  : boleta.productName,
//         "cantidad"    : boleta.qty,
//         "cliente"    : usuario
//     }).then(resp => {
//         console.log(resp);
//         }).catch((error) => {
//             console.log(error);
//         });

// }
VentasCollection: AngularFirestoreCollection<CartItemModel>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.VentasCollection = db.collection('Ventas', ref => ref.orderBy('fecCreacion', 'asc'));
  }
  getVentas(): Observable<any[]> {
    return this.db.collection('Ventas').snapshotChanges();
  }

  createVenta(Venta): Promise<any> {
    return this.db.collection('Ventas').add(Venta);
  }

}











