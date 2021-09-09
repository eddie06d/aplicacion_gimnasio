import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  cssUrl: string;
  textWrongDNI: string = 'Campo requerido.';
  validDNI: boolean = false;
  usuarios: any[] = [];

  form: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService: UserService, public sanitizer: DomSanitizer, private loginService: LoginService, private router: Router) {
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

  async registerUser() {
    const inputNames = document.querySelector("#nombres") as HTMLInputElement;
    const { correo, password, dni } = this.form.value;
    await this.loginService.registrarse(correo, password);
    this.userService.createUser({ nombres: inputNames.value, correo, dni, fecCreacion: new Date().toLocaleDateString(),
      tipo: 'usuario normal', estado: true }).then(() => {
      const user = StringFunctions.filterUsersByDni(dni, this.usuarios);
      localStorage.setItem('user', JSON.stringify(user));
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => this.router.navigate(["/principal"]));
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: error.message,
        timer: 4000
      });
    });
  }

  catchDNI(e): void {
    const inputNames = document.querySelector("#nombres") as HTMLInputElement;
    const val = e.target.value;
    if(val.length == 0) this.textWrongDNI = 'Campo requerido.';
    if(val.length == 8) {
      this.userService.checkDNI(val).then(data => {
        if(data.nombres) {
          this.validDNI = true;
          inputNames.value = StringFunctions.capitalizePhrase(`${data.apellidoPaterno} ${data.apellidoMaterno} ${data.nombres}`);
        }else {
          this.validDNI = false;
          this.textWrongDNI = 'DNI inexistente.';
        }
      });
    }else {
      this.textWrongDNI = 'El campo DNI debe tener solo 8 caracteres.';
    }
  }
}
