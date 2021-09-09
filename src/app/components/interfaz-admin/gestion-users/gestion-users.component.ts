import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {
  cssUrl: string;
  usuarios: any[] = [];
  usuariosExtra: any[] = [];
  labelValue: string = 'Valor:';
  placeholderValue: string = 'Ingresar valor';

  constructor(public sanitizer: DomSanitizer, private userService: UserService) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
    this.userService.getUsuarios().subscribe((userSnapshop) => {
      this.usuarios = [];
      this.usuariosExtra = [];
      userSnapshop.forEach((user) => {
        this.usuarios.push({
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        });
        this.usuariosExtra.push({
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        });
      });
    });
  }

  filter(e): void {
    const value = e.target.value;
    switch(value) {
      case '':
        this.labelValue = 'Valor:';
        this.placeholderValue = 'Ingresar valor';
        break;
      case 'email':
        this.labelValue = 'Email:';
        this.placeholderValue = 'Ingresar email';
        break;
      case 'nombres':
        this.labelValue = 'Nombres:';
        this.placeholderValue = 'Ingresar nombres';
        break;
    }
  }

  catchFilter(e) {
    const val = e.target.value;
    if(this.labelValue == 'Email:') {
      this.usuariosExtra = this.usuarios.filter(user => user.correo.startsWith(val));
    } else if (this.labelValue == 'Nombres:'){
      this.usuariosExtra = this.usuarios.filter(user => user.nombres.toLowerCase().startsWith(val));
    }
  }

}