import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit {
  usuarios: any[] = [];
  nombre: string = '';
  currentUser: any = {};

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('user'));
    // this.nombre = this.currentUser.nombres;

    this.loginService.getAuth().subscribe(user => this.currentUser = user);
    this.userService.getUsuarios().subscribe((userSnapshop) => {
      this.usuarios = [];
      userSnapshop.forEach((user) => {
        this.usuarios.push({
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        });
      });
    });
  }

  async logout() {

    // if(this.currentUser.dni){
    //   const { id, dni, nombres, correo, fecCreacion } = this.currentUser;
    // const user = {
    //   dni,
    //   nombres,
    //   correo,
    //   fecCreacion,
    //   estado: false
    //           };
    //   await this.userService.updateUser(id, user);    
    // }
    
    // localStorage.setItem('user', null);
    this.loginService.logout().then(() => this.router.navigate(["/login"]));
  }
  conteo : number = 0;
  AgregoCarrito : boolean = false;
  
  VerificarConteo():void{
    
    if(this.conteo >= 1){
      this.AgregoCarrito = true;
    }
    
  }


}

