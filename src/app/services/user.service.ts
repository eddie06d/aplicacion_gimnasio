import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenDNI: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVqaHVhbmNhaHVpcmVAZ21haWwuY29tIn0.0IiYNNlwsITnvoAtt0DTBZyf5T7zGgIGAhIEjt_QqXY';
  productosCollection: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore, private http: HttpClient, private storage: AngularFireStorage) {
    this.productosCollection = db.collection('productos', ref => ref.orderBy('fecCreacion', 'asc'));
  }

  checkDNI(dni: string): Promise<any> {
    return this.http.get<any>(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${this.tokenDNI}`).toPromise();
  }

  getProductos(): Observable<any[]> {
    return this.db.collection('usuarios').snapshotChanges();
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
