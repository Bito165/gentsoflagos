import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers:any;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
    this.api.getCustomerList().subscribe(
      res => {
        this.customers = res;
      }
    )
  }

}
