import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StringFunctions } from 'src/app/helpers/StringFunctions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  cssUrl: string;
  form: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, public sanitizer: DomSanitizer) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    const inputNames = document.querySelector("#nombres") as HTMLInputElement;
    this.userService.createUser({ nombres: inputNames.value, ...this.form.value}).then(() => console.log('User created correctly'));
  }

  catchDNI(e): void {
    const inputNames = document.querySelector("#nombres") as HTMLInputElement;
    const val = e.target.value;
    if(val.length == 8) {
      this.userService.checkDNI(val).then(data => {
        if(data.nombres) {
          inputNames.value = StringFunctions.capitalizePhrase(`${data.apellidoPaterno} ${data.apellidoMaterno} ${data.nombres}`);
        }else {
          inputNames.value = 'DNI inexistente';
        }
      });
    }else {
      inputNames.value = 'DNI debe tener 8 caracteres';
    }
  }

}
