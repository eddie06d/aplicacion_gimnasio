import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // usuario: User;
  // public userdata$ : Observable<firebase.User>;
  usuario : any = {};

  constructor(private authService: AngularFireAuth) {
    this.authService.authState.subscribe(user => {
      console.log("Estado del usuario:",user);
      if(!user) return;
      this.usuario.nombres = user.displayName;
      this.usuario.correo = user.email;
      this.usuario.foto = user.photoURL;
      //Nuevo
      this.usuario.uid = user.uid;
    });

  }
  
  // LOGIN MEDIANTE REDES 
  
  // ESTABA con async
  loginGoogle(){
      // Como estamos haciendo un async await  vamos a usar el try catch
    // try {
    //   // return this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>console.log(this.usuario)).catch(err => console.error('error'));
    //   return this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // }catch(error) {
    //   console.log(error);
    // }  
      return this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => console.log(this.usuario)).catch(err => console.error('error'));
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(datos => resolve(datos), error => reject(error))
    });
  }

  logout() {
    this.usuario = {};
    return this.authService.signOut();
  }

  registrarse(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email,password).then(datos => resolve(datos), error => reject(error))
    });
  }

}
