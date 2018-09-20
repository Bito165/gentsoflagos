import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import {  ApiBaseService } from "../../../services/apibase/api-base.service";
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { LocalStorageService } from "ngx-webstorage";
import { NgProgress } from "ngx-progressbar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string;
  response:any;
  signInMessage:string = "Sign In";
  time:any;
  constructor(private api:ApiBaseService,private router:Router, private local:LocalStorageService, private loader:NgProgress) { }

  ngOnInit() {
    this.local.clear('user_info');
  }

  login(form: NgForm){
    this.loader.start();
    this.signInMessage = "Signing In..."
    console.log(form.value);
    if(form.value.username == '' || form.value.password == '' ){
      this.errorMessage = "All fields are required";
      this.signInMessage = "Sign In"
    }else{
      this.time = new Date().getTime();
      this.api.postLogin(form.value.username, form.value.password, this.time).subscribe(
        user => {
          this.loader.done();
          console.log(user)
          this.response = user;
          if(this.response.message){
            this.errorMessage = this.response.message;
            this.signInMessage = "Sign In";
          }else{
            this.router.navigate(['/business/home']);
            this.local.store('user_info', this.response[0]);
          }
        }
      )
    }
  }

}
