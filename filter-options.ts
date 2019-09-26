import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HomePage } from '../Home/Home';
import { SignInPage } from '../SignIn/SignIn';
import { ECartPage } from '../ECart/ECart';

import {TokenService} from '../../services/Token/Token'

import {AWSUrl} from '../../services/AWSUrl/AWSUrl'
import {UserProfileService} from '../../services/UserProfile/UserProfile'

import {UserProfilePage} from '../UserProfile/Userprofile'
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { SearchPage } from '../Search/Search';

import { GeneralService } from '../../services/General/General';

import { VendorDetailPage } from '../VendorDetail/VendorDetail';



@IonicPage()
@Component({
  selector: 'page-filter-options',
  templateUrl: 'filter-options.html',
})
export class FilterOptionsPage {
  loading:Loading;
  selectedItem: any;
  posts:any;
  url:any;
  checkedItem: Array<any> = [];
  BrandMatch:Array<any> = [];
  brandItems:Array<any> = [];
  brandMatch:Array<any> = [];
  itemsBrand:Array<any> = [];
  checkedele:Array<any> = [];
  
  pricemin:any;
  pricemax:any;
  rangeObject:any;
  currentCount:any;

  products: Array<{ id: string,brand: string, name: string,price:string, url:string, weight:string, uom:string, inventory_id:string, sale_price:string,
	 quantity:string, veg_non_veg: String }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,private AWSUrl:AWSUrl,
    public token:TokenService, private loadingCtrl:LoadingController, private alertCtrl:AlertController,
    private userprofile:UserProfileService, public storage:Storage,private general:GeneralService) {
	this.checkedele= this.navParams.get('checkedbrands')
	console.log("elements", this.checkedele)
    this.rangeObject= {lower:10, upper:1500}; 
	this.checkedItem=this.brandMatch;
	console.log("match",this.brandMatch)
    this.pricemax=this.general.maxPrice;
    this.pricemin=this.general.minPrice;
    this.url=AWSUrl.Url;
    this.selectedItem = navParams.get('vendor');

    this.http.get(this.url + '/catalog/api/brands/vendor/' + this.selectedItem.id)
      .map(res => res.json()).subscribe(data => {
          this.posts = data;
    });       
  }

  
  PriceChange($event, rangeObject)
  {

  this.pricemax=this.rangeObject.upper;
  this.pricemin=this.rangeObject.lower;
}

  checkedBrand(event, task){
if(event.checked == true){
  //if checked then add the value to new array
  //before adding check if it exists then add to newarray
  if(this.checkedItem.indexOf(task)!=-1){
    //brand exists so do nothing
  }else{
    this.checkedItem.push(task);
  }
}else{
  //if unchecked - then check if array has that value and remove from the array
  console.log(this.checkedItem);
  if(this.checkedItem.indexOf(task)!=-1){
    //brand exists so remove that element
    for(var k = 0 ;k<this.checkedItem.length;k++){
      if(this.checkedItem[k] === task){
        this.checkedItem.splice(k,1);
      }
    }
  }else{
   
  }
}
 console.log("newarray",this.checkedItem);
}

resetAll() {
    //   if(this.general.brandMatch ===this.checkedItem){
    //     this.general.brandMatch = [];
		this.checkedItem = [];
		this.ApplyBrands();
      }


ApplyBrands(){
  let headers=new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
   this.http.post(this.url + '/catalog/api/products/filter',{
    vendorID:this.selectedItem.id,
    brands: this.checkedItem,
    minPrice: this.pricemin,
    maxPrice: this.pricemax
   },options)
   .map(res => res.json()).subscribe(data => {
 this.itemsBrand=data;
  this.navCtrl.push(VendorDetailPage, {
    vendor : this.selectedItem,
   brandItems: this.itemsBrand,
   scrollItem2:false,
   checkedItem:this.brandMatch,

});

   });
}

goBackVendorDetails(){
if(this.selectedItem){
	this.navCtrl.pop()
}
}

  addtocart(event, product) {
		
		if(this.token.loginState==false)
		{
			
			this.navCtrl.push(SignInPage);
		}
		else {
			
			this.showLoading();
			
			  
			  let headers=new Headers({ 'Content-Type': 'application/json'});
			   let options = new RequestOptions({ headers: headers });
			  
			  this.http.post(this.url + '/order/api/ecart',{
				  "customer_id" : this.token.CustomerID,
				  "inventory_id" : product.inventory_id,
				  "quantity" :  1
			  },options)
				.map(res => res.json()).subscribe(data => {
					
					this.userprofile.ecartId=data._id;
					this.showMessage("Added To Cart Successfully");
					//this.getCartCount(); //call to update the cart count
					this.storage.get('CustomerID').then(val => {
						this.token.CustomerID = val;
					
					});	// this.cartCount = this.General.cartCount;
				}
				,(err) => {
						this.showMessage("Error occured");
				});
		}
		
	}
				
	showLoading() {
		
		this.loading = this.loadingCtrl.create({
		  content: 'Please wait...',
		  dismissOnPageChange: true
		});
		this.loading.present();
			
	  }
	  
	  showMessage(text) {
		this.loading.dismiss();
	 
		let alert = this.alertCtrl.create({
		  title: 'Cart',
		  subTitle: text,
		  buttons: ['OK']
		});
		alert.present();
	  }	

  
   home(event) {
			  this.navCtrl.push(HomePage);
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
	  gofilterpage(event){
		console.log(this.selectedItem.id);
	  this.navCtrl.push(FilterOptionsPage, {
		vendor : this.selectedItem
		
	  });
	
}
  }
