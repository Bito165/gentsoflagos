import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings:any;
  orders:any;
  constructor(
    private api:ApiBaseService
  ) { }

  ngOnInit() {
    this.api.getBookingsOrders().subscribe(
      res => {
        console.log(res);
        this.bookings = res[0];
        this.orders = res[1];
      }
    )
  }

}
