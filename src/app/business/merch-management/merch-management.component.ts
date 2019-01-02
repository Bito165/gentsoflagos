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
  // uploader:file = new file1Uploader({url: URL, itemAlias: 'images'});
  merch:any;
  merchcategories:any;
  click:any;
  file1:any;
  file2:File;
  file3:File;
  noMerch:boolean = false;
  small_quantity:number = 0;
  medium_quantity:number = 0;
  large_quantity:number = 0;
  extra_large_quantity:number = 0;
  item_quantity:number = 0;
  title:any;
  restock:boolean = false;
  itemView:boolean = false;
  merch_item:any;
  errorMessage:any;
  loader:boolean = true;
  constructor(private progress:NgProgress, private api:ApiBaseService) { }

  addQuantity(){
    this.item_quantity = +this.small_quantity + +this.medium_quantity + +this.large_quantity + +this.extra_large_quantity;
  }

  addRestockQuantity(){
    this.merch_item.item_quantity = +this.merch_item.small_size_quantity + +this.merch_item.medium_size_quantity + +this.merch_item.large_size_quantity + +this.merch_item.extra_large_size_quantity;
  }

  ngOnInit() {

    this.getData();
  }

  getData(){
    this.api.getMerch().subscribe(
      res => {
        this.loader = false;
        console.log(res);
        this.merch = res;
        if(this.merch.length == 0){
          this.noMerch = true;
        }else{
          this.noMerch = false;
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
    console.log(this.file1, form.value, this.item_quantity);
    
    this.api.postNewMerch(form.value.item_name, this.item_quantity, form.value.item_price, form.value.item_category, 0, this.file1, form.value.item_color, this.small_quantity, '0', this.medium_quantity, '0', this.large_quantity, '0', this.extra_large_quantity, '0').subscribe(
      res => {
        this.progress.done();
        console.log(res);
        if (res['message'] == "Success"){
          this.getData();
          this.click = document.getElementById('addCls');
          this.click.click();
        }else{
          this.errorMessage = 'An Error Occured. Please Try Again';
        }
      },
      err => {
        this.progress.done();
        this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
      }
    )
  }

  postDeleteMerch(id){
    this.progress.start();
    this.api.postDeleteMerch(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == "Success"){
          this.getData();
        }
      }
    )
  }

  reset(){
    this.itemView = false;
    this.restock = false;
  }

  viewMerch(merch:any){
    this.reset();
    this.itemView = true;
    this.merch_item = merch;
    this.title = 'View Merch Item';
  }

  restockMerch(merch:any){
    this.reset();
    this.restock = true;
    this.merch_item = merch;
    this.title = 'Restock Merch Item'
  }

  handleUpload(e: FileList) {
    this.file1 =  e;
  }

  restockItem(){
    this.errorMessage = ''
    this.progress.start();
    this.api.postMerchRestock(this.merch_item).subscribe(
      res => {
        if(res['message']== 'Success'){
          this.progress.done();
          this.getData();
          document.getElementById('restockcls').click();
        }else{
          this.progress.done();
          this.errorMessage = 'An Error Occured. Please Try Again';
        }
      },
      err => {
        this.progress.done();
        this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
      }
    )
  }
    

    

}
