import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-the-team',
  templateUrl: './the-team.component.html',
  styleUrls: ['./the-team.component.css']
})
export class TheTeamComponent implements OnInit {
  staff:any;
  loader:boolean = true;
  constructor(public webServ:ApiBaseService, public local:LocalStorageService) { }

  ngOnInit() {
    this.webServ.getStaffList().subscribe(
      res => {
        this.loader = false;
        console.log(res);
        this.staff = res[0];
      }
    )
  }

  bookStaff(staff:any){
    this.local.store('staff', staff);
  }

}
