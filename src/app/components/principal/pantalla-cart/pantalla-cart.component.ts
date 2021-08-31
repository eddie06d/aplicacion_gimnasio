import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pantalla-cart',
  templateUrl: './pantalla-cart.component.html',
  styleUrls: ['./pantalla-cart.component.css']
})
export class PantallaCartComponent implements OnInit {
  cssUrl: string;

  constructor(public sanitizer: DomSanitizer) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }
  ngOnInit(): void {
  }

}
