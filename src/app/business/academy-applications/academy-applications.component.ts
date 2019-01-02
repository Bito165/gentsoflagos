import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { NgProgress } from "ngx-progressbar";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-academy-applications',
  templateUrl: './academy-applications.component.html',
  styleUrls: ['./academy-applications.component.css']
})
export class AcademyApplicationsComponent implements OnInit {
  applications:any;
  errorMessage:any;
  application:any;
  loader:boolean = true;
  applicationView:boolean = false;
  noApplications:boolean = true;
  constructor(
    private api:ApiBaseService,
    public progress:NgProgress,
    public local:LocalStorageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loader = true;
    this.api.getAcademyApplications().subscribe(
      res => {
        this.loader = false;
        console.log(res);
        this.applications = res;
        this.local.store('applications',this.applications.length);
        if(this.applications.length > 0){
          this.noApplications = false;
        }else{
          this.noApplications = true;
        }
      }
    )
  }

  viewApplication(application:any){
    this.application = application;
    this.applicationView = true;
  }

  updateApplicationStatus(){
    this.errorMessage = ''
    this.progress.start();
    this.api.postAcademyStatusUpdate(this.application.id, this.application.status).subscribe(
      res => {
        if(res['message']== 'Success'){
          this.progress.done();
          this.getData();
          document.getElementById('academyCls').click();
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
