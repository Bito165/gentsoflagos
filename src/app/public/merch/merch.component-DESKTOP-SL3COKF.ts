import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.css']
})
export class MerchComponent implements OnInit {
  merchCat:any;
  merchItems:any;
  merch: Array <{category:any, items:any}> = [];
  temp:any;
  index3:number;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
    this.api.getMerchPage().subscribe(
      res => {
        console.log(res);
        this.merchCat = res[0];
        this.merchItems = res[1];

        for (let index = 0; index < this.merchCat.length; index++) {
          
          this.index3 = 0;
          this.temp = [];

          for (let index2 = 0; index2 < this.merchItems.length; index2++) {
            
            if (this.merchCat[index].category_name == this.merchItems[index2].item_category) {
              this.temp.push(this.merchItems[index2]);
            }
            
          }
          
          this.merch.push({category: this.merchCat[index].category_name, items: this.temp})

        }

        console.log(this.merch);

      }
    )
  }

}
