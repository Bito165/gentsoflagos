import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers:any;
  noCustomers:boolean = true;
  loader:boolean = true;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
    this.api.getCustomerList().subscribe(
      res => {
        this.loader = false;
        this.customers = res;
        if(this.customers.length > 0){
          this.noCustomers = false;
        }
      }
    )
  }

}
