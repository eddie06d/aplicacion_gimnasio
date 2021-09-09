import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { BoletaService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  @Input() amount;
  @Input() items;

  venta :  BoletaService;
  currentUser: any = {};
  usuarios: any[] = [];

  constructor(
    
    public activeModal : NgbActiveModal, private loginService: LoginService, private servicioVenta : BoletaService,
    private userService : UserService){

   }
  ngOnInit(): void {
  
    // this.loginService.getAuth().subscribe(user => this.currentUser = user);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userService.getUsuarios().subscribe((userSnapshop) => {
      this.usuarios = [];
      userSnapshop.forEach((user) => {
        this.usuarios.push({
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        });
      });
    });
    console.log(this.items);
    console.log(this.items.length);

    this.agregar();
  }

  // GUARDAR LAS VENTAS EN FIREBASE 
  

  async agregar(){
    // console.log(this.currentUser);
    const boleta = [...this.items];
    console.log(boleta);
      
    for ( let indice of boleta){
        
        this.servicioVenta.createVenta({indice, user: this.currentUser.id}).then(() =>{ 
            console.log('se guardo');
        }
      );  
    }

  }

}
