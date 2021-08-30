import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz-admin',
  templateUrl: './interfaz-admin.component.html',
  styleUrls: ['./interfaz-admin.component.css']
})
export class InterfazAdminComponent implements OnInit {
  setting: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showUserProfile(): void {
    this.setting = !this.setting;
  }

}
