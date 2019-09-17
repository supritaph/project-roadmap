import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { FilterItemPage } from '../filter-item/filter-item';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    var min =10,max=4000,i=0;
    var c=(min+max)/10;
                for( i=min; i<max; i=i+c)
                {
                  console.log(Math.round(i) +":" +Math.round(i+c));
                  // var r=i+(i+c)/2;
                  // console.log(r)
                  // var r= min+max/2;
                  // console.log(r);

                }
  }
  signup()
  {
    this.navCtrl.push(SignupPage);
  }
  login()
  {
    this.navCtrl.push(LoginPage);
  }
  searchlist()
  {
    this.navCtrl.push(FilterItemPage)
  }
 
  

}
