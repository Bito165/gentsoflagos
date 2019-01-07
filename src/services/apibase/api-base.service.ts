import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  "rxjs/add/operator/map";
import { LocalStorageService } from "ngx-webstorage";
import * as moment from 'moment';
import { RequestOptions } from '@angular/http';

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
    this.user = this.local.retrieve('user_info');
    var body = {"amount":amount, "source": source, "staff": staff, "week_day": week_day, "month": month, "year":year, "createdby": this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'revenue/new', body)
      .map(res => res);
  }

  postExpense(amount, source, week_day, month, year){
    this.user = this.local.retrieve('user_info');
    var body = { "amount": amount, "source": source, "week_day": week_day, "month": month, "year": year, "createdby": this.user.username }
    return this.webServ.post(this.baseUrl + '/' + 'expenses/new', body)
      .map(res => res);
  }

  postNewUser(username:any, full_name:any, title:any, password:any, usertype:any){
    var time = new Date();
    this.user = this.local.retrieve('user_info');
    var body = {'username': username, 'full_name': full_name, 'title': title, 'password':password, 'usertype': usertype, 'createdby': this.user.username, 'createddate': time}
    return this.webServ.post(this.baseUrl + '/' + 'user/create-new', body)
      .map(res => res);
  }

  postNewStaffCategory(category_name){
    this.user = this.local.retrieve('user_info');
    var body = {'category_name': category_name, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'categories/staff-new', body);
  }

  postNewMerchCategory(category_name){
    this.user = this.local.retrieve('user_info');
    var body = {'category_name': category_name, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'categories/merch-new', body);
  }

  postNewMerch(item_name, item_quantity, item_price, item_category, quantity_sold, item_avatar, item_color, small_size_quantity, small_size_quantity_sold, medium_size_quantity, medium_size_quantity_sold, large_size_quantity, large_size_quantity_sold, extra_large_size_quantity, extra_large_size_quantity_sold){
    this.user = this.local.retrieve('user_info');
    const headers = new Headers()
    headers.set('enctype', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    const body = new FormData();

    body.append('item_name', item_name);
    body.append('item_quantity', item_quantity);
    body.append('item_category', item_category);
    body.append('item_price', item_price);
    body.append('item_color', item_color);
    body.append('quantity_sold', quantity_sold);
    body.append('small_size_quantity', small_size_quantity);
    body.append('large_size_quantity', large_size_quantity);
    body.append('medium_size_quantity', medium_size_quantity);
    body.append('extra_large_size_quantity', extra_large_size_quantity);
    body.append('small_size_quantity_sold', small_size_quantity_sold);
    body.append('large_size_quantity_sold', large_size_quantity_sold);
    body.append('medium_size_quantity_sold', medium_size_quantity_sold);
    body.append('extra_large_size_quantity_sold', extra_large_size_quantity_sold);
    body.append('createdby', this.user.username);
    for (let index = 0; index < item_avatar.length; index++) {
      body.append('images', item_avatar[index]);  
    }
    
    return this.webServ.post(this.baseUrl + '/' + 'merch/create-new', body);
  }

  postDeleteMerch(id:any){
    var body = { 'id': id };
    return this.webServ.post(this.baseUrl + '/' + 'merch/delete', body)
      .map(res => res);
  }

  postNewRevenueSource(source){
    this.user = this.local.retrieve('user_info');
    var body = { 'source': source, 'username': this.user.username}
    return this.webServ.post(this.baseUrl + '/' + 'sources/revenue-new', body);
  }

  postNewExpenseSource(source){
    this.user = this.local.retrieve('user_info');
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

  postNewStaff(staff_name, staff_bio, staff_category, staff_avatar, commission_rate, contact) {
    var body = new FormData();
    body.append('staff_name', staff_name);
    body.append('staff_bio', staff_bio);
    body.append('staff_category', staff_category);
    body.append('staff_avatar', staff_avatar);
    body.append('createdby', this.user.username);
    body.append('commission_rate', commission_rate);
    body.append('contact', contact);
    console.log(body);
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

  postBooking(staff_name, service, price, customer_name, date, time ,client_phone_number, status){
    client_phone_number = '+234' + client_phone_number;
    var body = {"staff_name": staff_name, "service": service, "time": time  ,"price": price, "customer_name": customer_name, "date": date, "client_phone_number":client_phone_number, 'status': 0}
    return this.webServ.post(this.baseUrl + '/' + 'bookings/new', body)
      .map(res => res);
  }

  postApplication(applicant_name, applicant_contact, applicant_gist, applicant_dob){
    var body = { 'applicant_name': applicant_name, 'applicant_contact': applicant_contact, 'applicant_gist': applicant_gist, 'applicant_dob': applicant_dob};
    return this.webServ.post(this.baseUrl + '/' + 'academy/new', body)
      .map(res => res);
  }

  postOrder(item_ordered, item_quantity, item_color ,item_size, client_name, date_due, status, delivery_address, client_phone_number, transaction_ref, amount, week_day, month, year){
    var body = { 'item_ordered': item_ordered, 'item_quantity':item_quantity , 'item_color':item_color , 'item_size': item_size, 'customer_name': client_name, 'date_due': date_due, 'status': status, 'delivery_address': delivery_address, 'client_phone_number': client_phone_number, 'transaction_ref': transaction_ref, 'amount': amount, 'week_day': week_day, 'month': month, 'year': year};
    return this.webServ.post(this.baseUrl + '/' + 'orders/new', body)
      .map(res => res);
  }

  postCheckItemAvailability(item_ordered, item_size, item_quantity, item_color){
    var body = { 'item_ordered': item_ordered, 'item_size': item_size, 'item_quantity':item_quantity , 'item_color':item_color};
    return this.webServ.post(this.baseUrl + '/' + 'checkAvailability', body)
      .map(res => res);
  }

  postBookingStatusUpdate(id, status){
    var body = {'id': id, 'status': status};
    return this.webServ.post(this.baseUrl + '/' + 'booking/status/update', body)
  }

  postOrderStatusUpdate(id, status){
    var body = {'id': id, 'status': status};
    return this.webServ.post(this.baseUrl + '/' + 'order/status/update', body)
  }

  postAcademyStatusUpdate(id, status){
    var body = {'id': id, 'status': status};
    return this.webServ.post(this.baseUrl + '/' + 'academy/application-status/update', body)
  }

  postMerchRestock(merch_item:any){
    var body = {'id': merch_item.id, 'item_quantity': merch_item.item_quantity ,'small_size_quantity': merch_item.small_size_quantity, 'medium_size_quantity': merch_item.medium_size_quantity, 'large_size_quantity': merch_item.large_size_quantity, 'extra_large_size_quantity': merch_item.extra_large_size_quantity};
    return this.webServ.post(this.baseUrl + '/' + 'merch/restock', body)
  }

  // Get APISS

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

  getRevenueHistory(){
    return this.webServ.get(this.baseUrl + '/' + 'revenue/history')
  }

  getExpensesHistory(){
    return this.webServ.get(this.baseUrl + '/' + 'expenses/history')
  }

  getProfitLossHistory(){
    return this.webServ.get(this.baseUrl + '/' + 'profit-loss/history')
  }
  
}
