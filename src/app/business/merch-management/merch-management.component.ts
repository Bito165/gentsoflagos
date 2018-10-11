import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { LocalStorage, LocalStorageService } from "ngx-webstorage";
import { NgForm } from '../../../../node_modules/@angular/forms';
import { NgProgress } from "ngx-progressbar";
@Component({
  selector: 'app-merch-management',
  templateUrl: './merch-management.component.html',
  styleUrls: ['./merch-management.component.css']
})
export class MerchManagementComponent implements OnInit {
  merch:any;
  merchcategories:any;
  click:any;
  constructor(private progress:NgProgress, private api:ApiBaseService) { }

  ngOnInit() {
    this.api.getMerch().subscribe(
      res => {
        console.log(res);
        this.merch = res;
        for (let index = 0; index < this.merch.length; index++) {
          this.merch[index].quantity_left = this.merch[index].item_quantity - this.merch[index].quantity_sold;
          
        }
      }
    )

    this.api.getMerchCat().subscribe(
      res => {
        console.log(res);
        this.merchcategories = res;
      }
    )
  }

  postMerch(form:NgForm){
    this.progress.start();
    
    this.api.postNewMerch(form.value.item_name, form.value.item_quantity, form.value.item_price, form.value.item_category, 0).subscribe(
      res => {
        this.progress.done();
        console.log(res);
        if (res['message'] == "Success"){
          this.ngOnInit();
          this.click = document.getElementById('addCls');
          this.click.click();
        }
      }
    )
  }

  postDeleteMerch(id){
    this.progress.start();
    this.api.postDeleteMerch(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == "Success"){
          this.ngOnInit();
        }
      }
    )
  }

}
