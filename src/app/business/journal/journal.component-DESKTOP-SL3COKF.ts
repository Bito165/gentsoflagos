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
<<<<<<< HEAD
=======
  newService;
  endButton;
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
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
<<<<<<< HEAD
  @ViewChild('closer') closer:ElementRef;
=======
  click:any;
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d

  constructor(private webServ:ApiBaseService, private progress:NgProgress) { }

  ngOnInit() {

    this.getStuff();
<<<<<<< HEAD

  }

=======
    this.click =  document.getElementById('close');
    console.log(this.click);

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
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
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
<<<<<<< HEAD
          this.closer.nativeElement.click();
=======
          setTimeout(() => {
            this.click.click();
          }, 2000);
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
        }else{
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

<<<<<<< HEAD
  getStuff(){
    this.webServ.getMaintenance().subscribe(
      res => {
        console.log(res);
        this.users = res[0];
        this.staffCategories = res[1];
        this.merchCategories = res[2];
        this.revenueSources = res[3];
        this.expenseSources = res[4];
        this.services = res[5];
=======
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
            this.click.click()
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
      }
    )
  }

<<<<<<< HEAD
  deleteUser(user_id:any){
    this.progress.start();
    this.webServ.postDeleteUser(user_id).subscribe(
=======
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
            this.click.click()
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  deleteStaffCat(id: any) {
    this.progress.start();
    this.webServ.postDeleteStaffCat(id).subscribe(
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          this.getStuff();
<<<<<<< HEAD
        }else{
          console.log(res);
        }
      }
    )
=======
        } else {
          console.log(res);
        }
      }
    )
  }

  deleteMerchCat(id: any) {
    this.progress.start();
    this.webServ.postDeleteMerchCat(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          console.log(res);
          this.getStuff();
        } else {
          console.log(res);
        }
      }
    )
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
            this.click.click()
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
            this.click.click()
          }, 2000);
        } else {
          this.rspMsg = "Operation Failed"
        }
      }
    )
  }

  deleteRevSource(id: any) {
    this.progress.start();
    this.webServ.postDeleteRevSource(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          this.getStuff();
        } else {
          console.log(res);
        }
      }
    )
  }

  deleteExpSource(id: any) {
    this.progress.start();
    this.webServ.postDeleteExpSource(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          this.getStuff();
        } else {
          console.log(res);
        }
      }
    )
  }

  //Service Maintenance Functions
  postNewService(form: NgForm) {
      this.progress.start();
      console.log(form.value);
      this.webServ.postNewService(form.value.service_name, form.value.service_price, form.value.duration, form.value.description).subscribe(
        res => {
          console.log(res);
          if (res['message'] == 'Success') {
            this.progress.done();
            this.getStuff();
            this.rspMsg = res['message'];
            setTimeout(() => {
              this.click.click()
            }, 2000);
          } else {
            this.rspMsg = "Operation Failed"
          }
        }
      )
  }

  deleteService(id: any) {
    this.progress.start();
    this.webServ.postDeleteService(id).subscribe(
      res => {
        this.progress.done();
        if (res['message'] == 'Success') {
          this.getStuff();
        } else {
          console.log(res);
        }
      }
    )
  }

  popModal(scenario:string){
    console.log(scenario);
    switch (scenario) {
      case 'newuser':
          this.newUser = true;
          this.newStaffCategory = false;
          this.newExpenseSource = false;
          this.newMerchCategory = false;
          this.newRevenueSource = false;
          this.newService = false;
          this.endButton = "ADD USER";
        break;
      case 'staffcat':
          this.newUser = false;
          this.newStaffCategory = true;
          this.newExpenseSource = false;
          this.newMerchCategory = false;
          this.newRevenueSource = false;
          this.newService = false;
          this.endButton = "ADD CATEGORY";
        break;
      case 'merchcat':
          this.newUser = false;
          this.newStaffCategory = false;
          this.newExpenseSource = false;
          this.newMerchCategory = true;
          this.newRevenueSource = false;
          this.newService = false;
          this.endButton = "ADD CATEGORY";
        break;
      case 'revsource':
          this.newUser = false;
          this.newStaffCategory = false;
          this.newExpenseSource = false;
          this.newMerchCategory = false;
          this.newRevenueSource = true;
          this.newService = false;
          this.endButton = "ADD SOURCE";
        break;
      case 'expsource':
          this.newUser = false;
          this.newStaffCategory = false;
          this.newExpenseSource = true;
          this.newMerchCategory = false;
          this.newRevenueSource = false;
          this.newService = false;
          this.endButton = "ADD SOURCE";
        break;
      case 'newservice':
          this.newUser = false;
          this.newStaffCategory = false;
          this.newExpenseSource = false;
          this.newMerchCategory = false;
          this.newRevenueSource = false;
          this.newService = true;
          this.endButton = "ADD SERVICE";
        break;
    
      default:
        break;
    }
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
  }

}
