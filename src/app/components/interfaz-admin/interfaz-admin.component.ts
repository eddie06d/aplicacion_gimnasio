import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-interfaz-admin',
  templateUrl: './interfaz-admin.component.html',
  styleUrls: ['./interfaz-admin.component.css']
})
export class InterfazAdminComponent implements OnInit {
  setting: boolean = false;

  currentUser : any = {};

  constructor(private userService : UserService, private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    
  }

  async logout() {
    const { id, dni, nombres, correo, fecCreacion, tipo } = this.currentUser;
    console.log(this.currentUser);
      const user = {
        dni,
        nombres,
        correo,
        fecCreacion,
        estado: false,
        tipo
      };
      await this.userService.updateUser(id, user);
      localStorage.setItem('user', null);
    this.loginService.logout().then(() => this.router.navigate(["/login"]));
  }

  showUserProfile(): void {
    this.setting = !this.setting;
  }

}
