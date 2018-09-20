import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  "rxjs/add/operator/map";
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class ApiBaseService {
  baseUrl:any = "http://localhost:8000/api"
  user: any;

  constructor(public webServ:HttpClient, public local:LocalStorageService) { 
    this.user = this.local.retrieve('user_info');
  }



  testapi(){
    return this.webServ.get(this.baseUrl)
    .map(res => res);
  }

  postLogin(username:any, password:any, time:Date){
    var body = { "username": username , "password": password, "last_login": time};
    return this.webServ.post(this.baseUrl + '/' + 'login' , body)
    .map(res => res);
  }

  postRevenue(){
    var body = {}
    return this.webServ.post(this.baseUrl + '/' + 'revenue/new', body)
      .map(res => res);
  }

  postExpense(){
    var body = {}
    return this.webServ.post(this.baseUrl + '/' + 'expenses/new', body)
      .map(res => res);
  }

  postNewUser(username:any, full_name:any, title:any, password:any, usertype:any){
    var time = new Date();
    var body = {'username': username, 'full_name': full_name, 'title': title, 'password':password, 'usertype': usertype, 'createdby': this.user.username, 'createddate': time}
    
    return this.webServ.post(this.baseUrl + '/' + 'user/create-new', body)
      .map(res => res);
  }

  postNewStaffCategory(category_name){
    var body = {'category_name': category_name, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'categories/staff-new', body);
  }

  postNewMerchCategory(category_name){
    var body = {'category_name': category_name, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'categories/merch-new', body);
  }

  postNewRevenueSource(source){
    var body = { 'source': source, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'sources/revenue-new', body);
  }

  postNewExpenseSource(source){
    var body = { 'source': source, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'sources/expenses-new', body);
  }

  postDeleteUser(user_id:any){
    var body = {'id': user_id};

    return this.webServ.post(this.baseUrl + '/' + 'user/delete', body)
      .map(res => res);

  }

  getDashboard() {
    return this.webServ.get(this.baseUrl + '/' + 'dashboard')
      .map(res => res);
  }

  getMaintenance() {
    return this.webServ.get(this.baseUrl + '/' + 'maintenance')
      .map(res => res);
  }
  
  
}
