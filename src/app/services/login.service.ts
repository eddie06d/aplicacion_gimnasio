import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: any = {};

  constructor(private authService: AngularFireAuth) {
    this.authService.authState.subscribe(user => {
      console.log("Estado del usuario:",user);
      if(!user) return;
      this.usuario.nombres = user.displayName;
      this.usuario.email = user.email;
      this.usuario.foto = user.photoURL;
    });
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
