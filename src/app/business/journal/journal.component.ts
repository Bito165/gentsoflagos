import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { NgForm } from '../../../../node_modules/@angular/forms'; 
import { NgProgress } from "ngx-progressbar";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  users:any;
  newService;
  endButton;
  staffCategories:any;
  merchCategories:any;
  revenueSources:any;
  expenseSources:any;
  services:any;
  type:any = 'info';
  title:any = "";
  newUser:boolean = false;
  newStaffCategory:boolean = false;
  newMerchCategory:boolean = false;
  newRevenueSource:boolean = false;
  newExpenseSource:boolean = false;
  newSource:boolean = false;
  rspMsg="";
  @ViewChild('closer', {read: ElementRef}) closer:ElementRef;

  constructor(private webServ:ApiBaseService, private progress:NgProgress) { }

  ngOnInit() {

    this.getStuff();

  }

  // Get Maintainance Data
  getStuff() {
    this.webServ.getMaintenance().subscribe(
      res => {
        console.log(res);
        this.users = res[0];
        this.staffCategories = res[1];
        this.merchCategories = res[2];
        this.revenueSources = res[3];
        this.expenseSources = res[4];
        this.services = res[5];
      }
    )
  }


  // User Maintanance Functions
  postNewUser(form : NgForm){
    this.progress.start();
    console.log(form.value);
    this.webServ.postNewUser(form.value.username, form.value.full_name, form.value.title, form.value.password, form.value.usertype).subscribe(
      res => {
        console.log(res);
        if(res['message'] == 'Success' ){
          this.progress.done();
          this.getStuff();
          this.rspMsg = res['message'];
          setTimeout(() => {
            this.closer.nativeElement.click();
          }, 2000);
        }else{
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  deleteUser(user_id:any){
    this.progress.start();
    this.webServ.postDeleteUser(user_id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          this.getStuff();
        }else{
          console.log(res);
        }
      }
    )
  }

  // Category Maintanance Functions 
  postNewStaffCategory(form: NgForm) {
    this.progress.start();
    console.log(form.value);
    this.webServ.postNewStaffCategory(form.value.category_name).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.getStuff();
          this.rspMsg = res['message']; 
          setTimeout(() => {
            this.closer.nativeElement.click();
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  postNewMerchCategory(form: NgForm) {
    this.progress.start();
    console.log(form.value);
    this.webServ.postNewMerchCategory(form.value.category_name).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.getStuff();
          this.rspMsg = res['message'];
          setTimeout(() => {
            this.closer.nativeElement.click();
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  deleteStaffCat(user_id: any) {
    this.progress.start();
    // this.webServ.postDeleteUser(user_id).subscribe(
    //   res => {
    //     this.progress.done();
    //     if (res['message'] == 'Success') {
    //       this.getStuff();
    //     } else {
    //       console.log(res);
    //     }
    //   }
    // )
  }

  deleteMerchCat(user_id: any) {
    this.progress.start();
    // this.webServ.postDeleteUser(user_id).subscribe(
    //   res => {
    //     this.progress.done();
    //     if (res['message'] == 'Success') {
    //       this.getStuff();
    //     } else {
    //       console.log(res);
    //     }
    //   }
    // )
  }

  // Source Maintanance Functions
  postNewRevenueSource(form: NgForm) {
    this.progress.start();
    console.log(form.value);
    this.webServ.postNewRevenueSource(form.value.source).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.getStuff();
          this.rspMsg = res['message'];
          setTimeout(() => {
            this.closer.nativeElement.click();
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  postNewExpenseSource(form: NgForm) {
    this.progress.start();
    console.log(form.value);
    this.webServ.postNewExpenseSource(form.value.source).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.getStuff();
          this.rspMsg = res['message'];
          setTimeout(() => {
            this.closer.nativeElement.click();
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  deleteRevSource(user_id: any) {
    this.progress.start();
    // this.webServ.postDeleteUser(user_id).subscribe(
    //   res => {
    //     this.progress.done();
    //     if (res['message'] == 'Success') {
    //       this.getStuff();
    //     } else {
    //       console.log(res);
    //     }
    //   }
    // )
  }

  deleteExpSource(user_id: any) {
    this.progress.start();
    // this.webServ.postDeleteUser(user_id).subscribe(
    //   res => {
    //     this.progress.done();
    //     if (res['message'] == 'Success') {
    //       this.getStuff();
    //     } else {
    //       console.log(res);
    //     }
    //   }
    // )
  }
}
