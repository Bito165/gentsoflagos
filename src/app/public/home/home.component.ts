import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {
    this.webServ.testapi().subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
