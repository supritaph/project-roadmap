 import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { SignInPage } from '../SignIn/SignIn';
import { ECartPage } from '../ECart/ECart';
import { HomePage } from '../Home/Home';
import { Http } from '@angular/http';
import {AWSUrl} from '../../services/AWSUrl/AWSUrl'
import {TokenService} from '../../services/Token/Token'
import {UserProfileService} from '../../services/UserProfile/UserProfile'
import {UserProfilePage} from '../UserProfile/Userprofile'
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'; 
import { VendorItemsPage } from '../vendor-items/vendor-items';
import { VendorDetailPage } from '../VendorDetail/VendorDetail';

@Component({
  selector: 'page-Categories',
  templateUrl: 'Categories.html'
})
export class CategoriesPage {
  icons: string[];
  items: Array<{ title: string, id: string, image: string }>;
  
  categoriesid:any;

  vendor:any;
  posts:any;
	cartCount: any;
	url: any;
	image;
	currentCount:any;
	values:Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public AWSUrl:AWSUrl, public token:TokenService,public userprofile:UserProfileService, public storage:Storage) {
	this.url=AWSUrl.Url;
	this.vendor=this.navParams.get('vendor');
console.log("vendor",this.vendor)
     this.http.get(AWSUrl.Url+ '/catalog/api/categories').map(res => res.json()).subscribe(data => {
        this.posts = data;
		
	 
		
		
    this.items = [];
    for (let i = 0; i < this.posts.length; i++) {
      this.items.push({
		title: this.posts[i].name,
		
		image: this.posts[i].image_url,
        id: this.posts[i]._id
        
	  });
	  console.log("items",this.items[i].id)

	}
	//  this.getCartCount();
//get Customer ID from token and thne call getCartCount()
this.storage.get('CustomerID').then(val => {
	this.token.CustomerID = val;
	this.getCartCount();
});

	});

  }
  getCartCount(){ //craete this as a service function 
	this.http.get(this.url + '/order/api/ecart/customer/' + this.token.CustomerID).map(res => res.json()).subscribe(data => {
		this.cartCount = data.length;
	});
  }
  itemTapped(event, item){
	

	console.log(this.vendor);

	  if(this.vendor){

		this.navCtrl.push(VendorDetailPage, {
			item: item,
			vendor:this.vendor,
			scrollItem3:false,
		
		})		
	  }else{
		this.navCtrl.push(ItemDetailsPage, {
			item: item,
		  });
	  }
  }

  CheckSession(page)
  {
	  this.storage.get('token').then((val) => {
		  this.token.token=val;
		  this.token.loginState=true;
		  
		  this.storage.get('CustomerID').then((val) => {
			  this.token.CustomerID=val;
			  
			 this.storage.get('role').then((val)=> {
				this.userprofile.role=val;
				
				this.storage.get('firstname').then((val)=> {
					this.userprofile.firstname=val;
					
					this.storage.get('lastname').then((val)=> {
						this.userprofile.lastname=val;
						
						this.storage.get('email').then((val)=> {
							this.userprofile.email=val;
							
							this.storage.get('contactno').then((val)=> {
								this.userprofile.contactno=val;
								
								this.storage.get('address').then((val)=> {
									this.userprofile.address=val;
									console.log(this.userprofile.firstname);
									if(this.token.token==null)
									{
										
										this.navCtrl.push(SignInPage);
										
									}
									else
									{
										if(page=="SignIn")
										{
										
											this.navCtrl.push(UserProfilePage);
											
										}
										else
										{
											this.navCtrl.push(ECartPage);
										}
									}
								});
							});
						});
					});
				});
			});
			
			
		  });
		  
	  });
	  
		
  }
  
  showCart(event) {
		this.CheckSession("Cart");
		
	}
	
	 home(event) {
			  this.navCtrl.push(HomePage);
		  }
}
