import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {
  cssUrl: string;
  labelValue: string = 'Valor:';
  placeholderValue: string = 'Ingresar valor';

  constructor(public sanitizer: DomSanitizer) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
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

}

