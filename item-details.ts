import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../Home/Home';
import { SignInPage } from '../SignIn/SignIn';
import { ECartPage } from '../ECart/ECart';
import { productDetailPage } from '../productDetail/productDetail';
import {AWSUrl} from '../../services/AWSUrl/AWSUrl'
import {TokenService} from '../../services/Token/Token'
import 'rxjs/add/operator/map';
import {UserProfilePage} from '../UserProfile/Userprofile'
import { SearchPage } from '../Search/Search';

import {UserProfileService} from '../../services/UserProfile/UserProfile'

import { GeneralService } from '../../services/General/General';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  posts:any;
  
  currentCount:any;
  url:any;
  branditems: Array<any> = [];
  checkeditem: Array<any> = [];
  scroll:boolean;
//   vendor:any;
  products: Array<{ id: string, name: string, price:string, url:string, weight:string, uom:string,veg_non_veg: String }>;
	cartCount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
	private general:GeneralService, public http:Http, private AWSUrl:AWSUrl,
	private alertCtrl:AlertController, 
	public token:TokenService,public localStorage:Storage, public storage:Storage, 
	public userprofile:UserProfileService) {
	// If we navigated to this page, we will have an item available as a nav param
	console.log("abcdef")
	this.url=AWSUrl.Url;
    this.selectedItem = navParams.get('item');
	this.scroll = true;
	// this.vendor=this.navParams.get('vendor')
	
	this.branditems=navParams.get('brandItems');
	
	this.checkeditem=navParams.get('checkedItem')
	// if(navParams.get("scrollItem2")!= undefined){
	this.scroll=navParams.get('scrollItem2');
	// console.log("selected items",this.selectedItem.id);

	this.currentCount=1;
	this.http.get(AWSUrl.Url + '/catalog/api/product/category/' + this.selectedItem.id + "/" + this.currentCount).map(res => res.json()).subscribe(data => {
        this.posts = data;
		
		
	this.products = [];
    for (let i = 0; i < this.posts.length; i++) {
		if(this.posts[i].name!=null)
		{
			
				  this.products.push({
					id: this.posts[i]._id,
					name: this.posts[i].brand + " " + this.posts[i].name,			
					price:"Vendor Specific",
					url:AWSUrl.Url + this.posts[i].image_urls[0],
					weight: this.posts[i].weight,
					uom: this.posts[i].uom,
					veg_non_veg: this.posts[i].veg_non_veg

				  });
				 
		if(navParams.get("scrollItem2")!= undefined){
			this.scroll=navParams.get('scrollItem2');
			
			// this.branditems=this.products;
			this.products=this.branditems;
			
		}
			
		}
    }
//get Customer ID from token and thne call getCartCount()
this.storage.get('CustomerID').then(val => {
	this.token.CustomerID = val;
	this.getCartCount();
});
	console.log(this.products[0].url)
	
	});
  }
  getCartCount(){ //craete this as a service function 
	this.http.get(this.url + '/order/api/ecart/customer/' + this.token.CustomerID).map(res => res.json()).subscribe(data => {
		this.cartCount = data.length;
	});
  }
  doInfinite(infiniteScroll) {

	this.currentCount = this.currentCount + 1;
	this.http.get(this.url + '/catalog/api/product/category/' + this.selectedItem.id + "/" + this.currentCount).map(res => res.json()).subscribe(data => {
        this.posts = data;
    for (let i = 0; i < this.posts.length; i++) {
		if(this.posts[i].name!=null)
		{
				  this.products.push({
					id: this.posts[i]._id,
					name: this.posts[i].brand + " " + this.posts[i].name,			
					price:"Vendor Specific",
					url:this.url + this.posts[i].image_urls[0],
					weight: this.posts[i].weight,
					uom: this.posts[i].uom,
					veg_non_veg: this.posts[i].veg_non_veg					
				  });
					}
    }
	infiniteScroll.complete();
	});
  }

  resetFilter() {
	let alert = this.alertCtrl.create({
		title: 'do you want to uncheck selectedItems?',
		buttons: ['OK']
	});
	alert.present();
	}
  ViewProduct(event, product) {
    this.navCtrl.push(productDetailPage, {
      product: product
    });
  }
  gofilterpage(event){
	console.log(this.selectedItem.id);
  this.navCtrl.push(CategoryFilterPage, {
	vendor : this.selectedItem,
  });
}
  
   home(event) {
			  this.navCtrl.push(HomePage);
		  }

	checkout(event){
		
      if(this.token.loginState==false)
      {
      this.navCtrl.push(SignInPage);
      }
      else
      {
        this.navCtrl.push(ECartPage);
      }
    }
  showLogin(event) {
		 
    	  this.CheckSession("SignIn");
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
	 myInput : string ;

	onInput(event)
  	{
      console.log(this.myInput);
      if (this.myInput){
  		this.navCtrl.push(SearchPage, {
  		myInput : this.myInput
  		});
  		}
  	}
}
