import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  "rxjs/add/operator/map";

@Injectable()
export class ApiBaseService {

  baseurl:any = "http://localhost:8000";

  constructor(public webServ:HttpClient) { }

  testapi(){
    return this.webServ.get(this.baseurl + '/' + 'api')
    .map(res => res);
  }

  login(username:any, password:any, time:Date){
    var body = { "username": username , "password": password, "last_login": time};
    return this.webServ.post(this.baseurl + '/' + 'api' + '/' + 'login' , body)
    .map(res => res);
  }

  dashboard(){
    return this.webServ.get(this.baseurl + '/' + 'api' + '/' + 'dashboard')
    .map(res => res);
  }

  postRevenue(){
    var body = {}
    return this.webServ.post(this.baseurl + '/' + 'api' + '/' + 'revenue' + '/' + 'new', body)
      .map(res => res);
  }

  postExpense(){
    var body = {}
    return this.webServ.post(this.baseurl + '/' + 'api' + '/' + 'expenses' + '/' + 'new', body)
      .map(res => res);
  }

  
  
}
