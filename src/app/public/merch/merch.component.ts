import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.css']
})
export class MerchComponent implements OnInit {
  categories:any;
  merch:any;
  loader:boolean = true;
  items: Array <{category:string, item:any}> = [];
  constructor(public api:ApiBaseService, public local:LocalStorageService) { }

  ngOnInit() {
    this.api.getMerchCat().subscribe(
      res => {
        console.log(res)
        this.categories = res;
        this.api.getPublicMerch().subscribe(
          res => {
            this.loader = false;
            console.log(res)
            this.merch = res;
            this.items = [];
            for (let index = 0; index < this.categories.length; index++) {
                this.items.push({ category: this.categories[index].category_name, item:[]});
                for (let index2 = 0; index2 < this.merch.length; index2++) {
                  if(this.categories[index].category_name == this.merch[index2].item_category){
                    this.items[index].item.push(this.merch[index2]);
                  } 
                }
            }
            console.log(this.items);
          }
          
        )
      }
    )
  }

  selectMerch(merch:any){
    this.local.store('merch', merch);
  }

  


}
