import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenDNI: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVqaHVhbmNhaHVpcmVAZ21haWwuY29tIn0.0IiYNNlwsITnvoAtt0DTBZyf5T7zGgIGAhIEjt_QqXY';

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  checkDNI(dni: string): Promise<any> {
    return this.http.get<any>(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${this.tokenDNI}`).toPromise();
  }

  createUser(user): Promise<any> {
    return this.db.collection('usuarios').add(user);
  }

}
