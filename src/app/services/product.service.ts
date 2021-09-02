import { Product } from './../models/product';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productosCollection: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.productosCollection = db.collection('productos', ref => ref.orderBy('fecCreacion', 'asc'));
  }
  getProductos(): Observable<any[]> {
    return this.db.collection('productos').snapshotChanges();
  }

  createProduct(product): Promise<any> {
    return this.db.collection('productos').add(product);
  }

  updateProduct(documentId: string, data: any): Promise<void> {
    return this.db.collection('productos').doc(documentId).set(data);
  }

  deleteProduct(documentId: string): Promise<void> {
    return this.db.collection('productos').doc(documentId).delete();
  }

  uploadImage(image: any): Promise<string> {
    const filePath = `products/${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);
    return new Promise(resolve => {
      task.snapshotChanges().pipe(finalize(() =>  {
        fileRef.getDownloadURL().subscribe(url => {
          const ga = url;
          resolve(ga);
          return;
        });
      })).subscribe();
    });
  }

  deleteImage(url: string): Promise<string> {
    return new Promise(resolve => {
      this.storage.refFromURL(url).delete().subscribe(() => resolve('ok'));
    });
  }


}
