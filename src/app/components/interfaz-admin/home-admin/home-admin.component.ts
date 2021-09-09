import { Component, OnInit } from '@angular/core';
import { StringFunctions } from 'src/app/helpers/StringFunctions';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { dataUsersNew, dataProductsNew } from '../../../helpers/dataTest';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  dataUsers: any[];
  products: any[];
  dataProducts: any[];
  view: any[] = [550, 300];

  usuarios : any [] = [];

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  multi : any = {};


  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(usuarios : UserService, private userService : UserService, private productService : ProductService) {

    this.dataProducts = dataProductsNew;

    // this.productService.getProductos().subscribe((productoCambio)=>{
    //   this.products = [];
    //   productoCambio.forEach((producto)=>{
    //     this.products.push({  
    //       $key: producto.payload.doc.id,
    //       ...producto.payload.doc.data()
    //     })
        
    //   })
    //   this.dataProducts = StringFunctions.createArrayProd(this.products);
    //   })

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

      this.multi = StringFunctions.createArrayByFec(this.usuarios);
      console.log(this.multi);
      this.dataUsers = this.multi;



    });
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
