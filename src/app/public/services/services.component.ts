import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:any;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
    this.api.getPublicServices().subscribe(
      res => {
        this.services = res;
      }
    )
  }

}
