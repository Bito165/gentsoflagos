import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit {
  errorMessage:any;
  modal:any;
  msg:any;
  fullname:any = '';
  reason:any= '';
  dob:any= '';
  applicant_contact:any= '';
  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {
  }

  academyApplication(){
    
    if(this.fullname == '' || this.dob == '' || this.reason == '' || this.applicant_contact == ''){
      this.errorMessage = 'Please Fill In All Fields';
      return;
    }else{
      this.webServ.postApplication(this.fullname, this.applicant_contact, this.reason, this.dob)
      .subscribe(
        res => {
          if(res['message'] == 'Success'){
            this.modal = document.getElementById('modal-btn');
            this.modal.click();
            this.msg = 'Hey ' + this.fullname + ', your application has been successfully submitted. You will be contacted by call or text on the number supplied.';
            this.fullname == ''; this.dob == ''; this.reason == ''; this.applicant_contact == '';
            return;
          }
        },
        err => {
          this.errorMessage = 'A Network Error Occured. Please Try Again';
          return;
        }
      )
    }
  }
}
