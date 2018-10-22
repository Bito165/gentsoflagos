import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment';
import { NgForm } from '../../../../node_modules/@angular/forms'; 

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit {
  modalmsg:any;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
  }

  postApplication(form:NgForm){
    console.log(form.value);
    this.modalmsg = "Submitting Your Application...";

    this.api.postApplication(form.value.applicant_name, form.value.applicant_contact, form.value.applicant_gist).subscribe(
      res => {
        if(res['message']=='Success'){
          this.modalmsg = "Your Application was successfully submited. We will contact you through the phone number submitted for more details."
          form.reset();
        }else{
          this.modalmsg = "An Error Occured while submitting your application. Please try again"
        }
      }
    )
  }

}
