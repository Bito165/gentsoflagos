import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-academy-applications',
  templateUrl: './academy-applications.component.html',
  styleUrls: ['./academy-applications.component.css']
})
export class AcademyApplicationsComponent implements OnInit {
  applications:any;
  constructor(
    private api:ApiBaseService
  ) { }

  ngOnInit() {
    this.api.getAcademyApplications().subscribe(
      res => {
        console.log(res);
        this.applications = res;
        for (let index = 0; index < this.applications.length; index++) {
          this.applications[index].status = "New Applicant";
        }
      }
    )
  }

}
