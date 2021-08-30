import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { StringFunctions } from 'src/app/helpers/StringFunctions';

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
  buttonUpdate: any = {
    text: 'Update profile',
    icon: 'fas fa-user-edit'
  };

  constructor(public sanitizer: DomSanitizer, private userService: UserService) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
  }

  fileImage(): void {
    const fileHide = document.querySelector("#upload-image") as HTMLInputElement;
    fileHide.click();
  }

  updateProfile(): void {
    this.buttonUpdate.text === 'Update profile' ? this.handleProfile('Save changes', 'fas fa-upload', false) : this.handleProfile('Update profile', 'fas fa-user-edit', true);
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
    if(val.length == 8) {
      this.userService.checkDNI(val).then(data => {
        if(data.nombres) {
          firstName.value = StringFunctions.capitalizePhrase(`${data.nombres}`);
          lastName.value = StringFunctions.capitalizePhrase(`${data.apellidoPaterno} ${data.apellidoMaterno}`);
        }
      });
    }
  }

}
