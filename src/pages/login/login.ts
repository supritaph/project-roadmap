import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { throwError } from 'rxjs';


import {  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { ProductsPage } from '../products/products';
import { catchError } from 'rxjs/operators';
import { NewProductsPage } from '../new-products/new-products';
// import { catchError } from 'rxjs/operators';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild("form")
  form: NgForm;
  email: any[];
  password: any[];
  showErrorMessage = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onSubmit123()
  {
    this.navCtrl.push(NewProductsPage);
  }
  onSubmit( password:string,email:string){
    
      
    let headers=new Headers({ 'Content-Type': 'application/json'}); 
         let options = new RequestOptions({ headers: headers });
         console.log(this.form.value.password);
         console.log(this.form.value.email);
         

         this.http.post('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/security/api/login',
     {
  "password": this.form.value.password,
  "email": this.form.value.email,  
  
      })
    .subscribe(
      (data:any) => {
        console.log(data);
        
        // localStorage.setItem('token',data.token),
        // localStorage.setItem('email',data.token)
        localStorage.setItem('currentUser', JSON.stringify({ 'email': data.email ,'fullname': data.fullname, 'token': data.token  }));

        this.navCtrl.push(ProductsPage)
        },
      //       (err: HttpErrorResponse) => {
      //  console.log(err);
      //  alert(err);
    //   catchError((err: HttpErrorResponse) => {
    //     console.log("new errror",err);
    //     throw 'Error in source. Details: ' + err; // Use console.log(err) for detail
    // }) 
    // (err)=>{
    //   console.log("error is",err.message);
    
    // }
    (err) => {
      alert(err);
      this.showErrorMessage = true;
      console.log("error is", this.showErrorMessage)
    }
  
            // }
            )
            
            
    // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
  


