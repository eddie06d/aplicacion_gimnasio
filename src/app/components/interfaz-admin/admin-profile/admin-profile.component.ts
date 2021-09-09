import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  cssUrl: string;
  userProfile: any = {
    dni: '70882033',
    firstName: 'Eddie Jamil',
    lastName: 'Huancahuire Velasquez',
    email: 'ejhuancahuire@gmail.com',
    password: 'miperroesjugueton06',
    phoneNumber: '963709049'
  };
  currentUser: any = {};
  buttonUpdate: any = {
    text: 'Update profile',
    icon: 'fas fa-user-edit'
  };

  constructor(public sanitizer: DomSanitizer, private userService: UserService, private router: Router) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    this.userProfile = {
      nombres: this.currentUser.nombres,
      dni: this.currentUser.dni,
      firstName: `${this.currentUser.nombres.split(' ')[2]} ${this.currentUser.nombres.split(' ')[3]}`,
      lastName: `${this.currentUser.nombres.split(' ')[0]} ${this.currentUser.nombres.split(' ')[1]}`,
      email: this.currentUser.correo,
      phoneNumber: this.currentUser?.phoneNumber
    };
  }

  fileImage(): void {
    const fileHide = document.querySelector("#upload-image") as HTMLInputElement;
    fileHide.click();
  }

  updateProfile(): void {
    if (this.buttonUpdate.text === 'Update profile') {
      this.handleProfile('Save changes', 'fas fa-upload', false);
    } else {
      this.handleProfile('Update profile', 'fas fa-user-edit', true);
      const fName = (document.querySelector('#firstName') as HTMLInputElement).value;
      const lName = (document.querySelector('#lastName') as HTMLInputElement).value;
      let user = {
        correo: this.userProfile.email,
        dni: this.userProfile.dni,
        estado: true,
        fecCreacion: this.currentUser.fecCreacion,
        nombres: `${lName} ${fName}`,
        tipo: this.currentUser.tipo
      }
      this.userService.updateUser(this.currentUser.id, user).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  deleteAccount() {
    Swal.fire({
      icon: 'info',
      title: `¿Estas seguro de eliminar tu cuenta?`,
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: '<i class="fas fa-check me-2"></i>Confirm',
      cancelButtonText: '<i class="fas fa-times me-2"></i>Cancel'
    }).then(async (result) => {
      if (result.isDenied) {
        this.userService.deleteUser(this.currentUser.id).then(() => {
          Swal.fire({ icon: 'success', title: `La cuenta ha sido eliminada`, timer: 2500, showConfirmButton: false }).then(() => this.router.navigate(['/login']));
        });
      }
    });
  }

  handleProfile(textButton: string, textIcon: string, inputDisabled: boolean): void {
    let inputChanges = document.querySelectorAll('.change');
    inputChanges.forEach((input) => (input as HTMLInputElement).disabled = inputDisabled);
    this.buttonUpdate.text = textButton;
    this.buttonUpdate.icon = textIcon;
  }

  catchDNI(e): void {
    const firstName = document.querySelector("#firstName") as HTMLInputElement;
    const lastName = document.querySelector("#lastName") as HTMLInputElement;
    const val = e.target.value;
    if (val.length == 8) {
      this.userService.checkDNI(val).then(data => {
        if (data.nombres) {
          firstName.value = StringFunctions.capitalizePhrase(`${data.nombres}`);
          lastName.value = StringFunctions.capitalizePhrase(`${data.apellidoPaterno} ${data.apellidoMaterno}`);
        }
      });
    }
  }

}