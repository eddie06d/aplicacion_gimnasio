import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cssUrl: string;
  usuarios: any[] = [];
  form: FormGroup = new FormGroup({
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public sanitizer: DomSanitizer, private loginService: LoginService, private router: Router, private userService: UserService) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
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

  login() {
    const { correo, password } = this.form.value;
    let user = StringFunctions.filterUsersByEmail(correo, this.usuarios);
    this.loginService.login(correo, password).then(async () => {
      localStorage.setItem('user', JSON.stringify(user));
      const userP = {
        dni: user.dni,
        nombres: user.nombres,
        correo: user.correo,
        fecCreacion: user.fecCreacion,
        estado: true
      };
      await this.userService.updateUser(user.id, userP);
      /* this.loginService.usuario.dni = user.dni;
      this.loginService.usuario.nombres = user.nombres; */
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      }).then(() => this.router.navigate(["/principal"]))
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: error.message,
        timer: 3000
      });
    });
  }

}
