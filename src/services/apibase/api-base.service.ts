import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  "rxjs/add/operator/map";
import { LocalStorageService } from "ngx-webstorage";
import { duration } from 'moment';

@Injectable()
export class ApiBaseService {
  baseUrl: any = "https://gentsoflagos.herokuapp.com/api"
  user:any = this.local.retrieve('user_info');

  constructor(public webServ:HttpClient, public local:LocalStorageService) { 
  }



  testapi(){
    return this.webServ.get(this.baseUrl)
    .map(res => res);
  }

  postLogin(username:any, password:any, time:Date){
    var body = { "username": username , "password": password, "last_login": time};
    console.log(this.baseUrl + '/' + 'login')
    return this.webServ.post(this.baseUrl + '/' + 'login' , body)
    .map(res => res);
  }

  postRevenue(amount, source, staff, week_day, month, year){
    var body = {"amount":amount, "source": source, "staff": staff, "week_day": week_day, "month": month, "year":year, "createdby": this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'revenue/new', body)
      .map(res => res);
  }

  postExpense(amount, source, week_day, month, year){
    var body = { "amount": amount, "source": source, "week_day": week_day, "month": month, "year": year, "createdby": this.user.username }
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

  postNewMerch(item_name, item_quantity, item_price, item_category, quantity_sold){
    var body = {"item_name": item_name, "item_quantity":item_quantity, "item_price": item_price, "item_category": item_category, "quantity_sold":quantity_sold ,"createdby": this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'merch/create-new', body);
  }

  postDeleteMerch(id:any){
    var body = { 'id': id };
    return this.webServ.post(this.baseUrl + '/' + 'merch/delete', body)
      .map(res => res);
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

  postDeleteStaffCat(id:any){
    var body = {'id': id};
    console.log(id);
    return this.webServ.post(this.baseUrl + '/' + 'categories/staff-delete', body)
      .map(res => res);
  }

  postDeleteMerchCat(id:any){
    var body = {'id': id};

    return this.webServ.post(this.baseUrl + '/' + 'categories/merch-delete', body)
      .map(res => res);
  }

  postDeleteRevSource(id:any){
    var body = {'id': id};
    console.log(id);
    return this.webServ.post(this.baseUrl + '/' + 'sources/revenue-delete', body)
      .map(res => res);
  }

  postDeleteExpSource(id:any){
    var body = {'id': id};
    return this.webServ.post(this.baseUrl + '/' + 'sources/expenses-delete', body)
      .map(res => res);
  }

  postNewService(service_name, service_price, duration, description){
    var body = { 'service_name': service_name, 'service_price': service_price, 'duration': duration, 'description': description  ,'username': this.user.username }
    return this.webServ.post(this.baseUrl + '/' + 'services/create-new', body);
  }

  postDeleteService(id: any) {
    var body = { 'id': id };
    return this.webServ.post(this.baseUrl + '/' + 'services/delete', body)
      .map(res => res);
  }

  postNewStaff(staff_name, staff_bio, staff_category, staff_avatar) {
    console.log(typeof(staff_bio));
    var body = { 'staff_name': staff_name, 'staff_bio': staff_bio, 'staff_category': staff_category, 'staff_avatar': staff_avatar, 'username': this.user.username }
    return this.webServ.post(this.baseUrl + '/' + 'staff/create-new', body)
    .map(res => res);
  }

  postStaffSchedule(work_days, id){
    console.log(id);
    var body = { "id": id, "work_days": work_days} 
    return this.webServ.post(this.baseUrl + '/' + 'staff/schedule', body)
      .map(res => res);
  }

  postDeleteStaff(id: any) {
    var body = { 'id': id };
    return this.webServ.post(this.baseUrl + '/' + 'staff/delete', body)
      .map(res => res);
  }

  postBooking(staff_name, service, price, customer_name, date, time ,client_phone_number){
    var body = {"staff_name":staff_name, "service": service, "time":time  ,"price":price, "customer_name": customer_name, "date": date, "client_phone_number":client_phone_number}
    return this.webServ.post(this.baseUrl + '/' + 'bookings/new', body)
      .map(res => res);
  }

  postApplication(applicant_name, applicant_contact, applicant_gist){
    var body = { 'applicant_name': applicant_name, 'applicant_contact': applicant_contact, 'applicant_gist': applicant_gist};
    return this.webServ.post(this.baseUrl + '/' + 'academy/new', body)
      .map(res => res);
  }

  // Get APIS

  getDashboard() {
    return this.webServ.get(this.baseUrl + '/' + 'dashboard')
      .map(res => res);
  }

  getMaintenance() {
    return this.webServ.get(this.baseUrl + '/' + 'maintenance')
      .map(res => res);
  }
  
  getMerch(){
    return this.webServ.get(this.baseUrl + '/' + 'business/merch/all')
      .map(res => res);
  }

  getMerchCat(){
    return this.webServ.get(this.baseUrl + '/' + 'business/merch/categories')
      .map(res => res);    
  }

  getStaffCat(){
    return this.webServ.get(this.baseUrl + '/' + 'business/staff/categories')
      .map(res => res);    
  }

  getCustomerList(){
    return this.webServ.get(this.baseUrl + '/' + 'customer-list')
    .map(res => res)
  }

  getStaffList(){
    return this.webServ.get(this.baseUrl + '/' + 'staff-list')
      .map(res => res)
  }

  getBookingsOrders(){
    return this.webServ.get(this.baseUrl + '/' + 'bookings-orders/history')
      .map(res => res)
  }

  getAcademyApplications(){
    return this.webServ.get(this.baseUrl + '/' + 'academy/applications')
      .map(res => res)
  }

  getPublicMerch(){
    return this.webServ.get(this.baseUrl + '/' + 'public/merch/all')
      .map(res => res)
  }

  getPublicServices(){
    return this.webServ.get(this.baseUrl + '/' + 'services')
      .map(res => res)
  }

  getMerchPage(){
    return this.webServ.get(this.baseUrl + '/' + 'merch')
    .map(res => res)
  }

  getPreBooking(){
    return this.webServ.get(this.baseUrl + '/' + 'pre-booking')
    .map(res => res)
  }
  
}
