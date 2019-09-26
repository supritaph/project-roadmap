import { Component, Input } from '@angular/core';


import { NavController, NavParams, AlertController,LoadingController, Loading } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HomePage } from '../Home/Home';
import { SignInPage } from '../SignIn/SignIn';
import { ECartPage } from '../ECart/ECart';
import { productDetailPage } from '../productDetail/productDetail';
import {TokenService} from '../../services/Token/Token'

import {AWSUrl} from '../../services/AWSUrl/AWSUrl'
import {UserProfileService} from '../../services/UserProfile/UserProfile'

import {UserProfilePage} from '../UserProfile/Userprofile'
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { SearchPage } from '../Search/Search';
import {VendorFilterItemPage} from '../VendorFilterItem/VendorFilterItem';
import { GeneralService } from '../../services/General/General';
import { FilterOptionsPage } from '../filter-options/filter-options';

import { CategoriesPage } from '../Categories/Categories';

@Component({
  selector: 'page-VendorDetail',
  templateUrl: 'VendorDetail.html'
})
export class VendorDetailPage {
	// @Input('BrandMatch') BrandMatch: FilterOptionsPage;
	
	loading:Loading;
  selectedItem: any;
  posts:any;
  VendorName:string;
  StoreType:string;
  EstablishedYear:string;
  OwnerName:string;
  ContactNo:string;
  address:string;
  city:string;
  pincode:string;
  image_urls:Array<{url:string}>;
  url:any;
  cartCount:any;

  branditems: Array<any> = [];
  checkeditem: Array<any> = [];
  elements:Array<any> = [];

  vendor:any;
  category:any;
  

  currentCount:any;
  scroll:boolean;
  scrollcategory:boolean;


  details: Array<{ id: string, name: string, image_url:any }>;
  products: Array<{ id: string, name: string, price:string, url:string, weight:string, uom:string, inventory_id:string, sale_price:string,
	 quantity:string, veg_non_veg: String }>;
	item: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, 
	public token:TokenService, private AWSUrl:AWSUrl,private loadingCtrl:LoadingController, private alertCtrl:AlertController,
	private userprofile:UserProfileService, public storage:Storage, private general:GeneralService) {
    // If we navigated to this page, we will have an item available as a nav param
	this.url=AWSUrl.Url;
	this.selectedItem = navParams.get('vendor');
	
	this.scroll = true;
	this.branditems=navParams.get('brandItems');
	this.scroll=navParams.get('scrollItem3');
	// console.log("scroll",this.scroll)
	this.checkeditem=navParams.get('checkedItem')
console.log("checkeditems",this.checkeditem)

	this.item=navParams.get('item');
	
	this.vendor=navParams.get('vendor')
	
// if(navParams.get("scrollItem3")!= undefined){
	if(this.item){
		this.currentCount=1;
		this.http.get(this.url + '/catalog/api/products/category/' + this.vendor.id + "/" + this.item.id + "/" + + this.currentCount)
		.map(res => res.json()).subscribe(data => {
			this.elements = data;

			this.products=this.elements;
			console.log("elements",this.elements)
		})
	}
	
	
	// this.category=this.navParams.get('venodr')
	this.http.get(this.url + '/catalog/api/vendor/' + this.selectedItem.id).map(res => res.json()).subscribe(data => {
        this.posts = data;
		
	this.VendorName=this.posts.store_name;
	this.StoreType=this.posts.store_type;
	this.EstablishedYear=this.posts.established_year;
	this.OwnerName=this.posts.owner_name;
	this.ContactNo=this.posts.contact_no;
	this.address=this.posts.address;
	this.city=this.posts.city;
	this.pincode=this.posts.pincode;
	this.image_urls=[];
	for(let i=0; i<this.posts.image_urls.length;i++) {
		
		this.image_urls.push({
			url:this.url +  this.posts.image_urls[i]
		});
	}
	console.log(this.url)
	this.currentCount=1;
	this.http.get(this.url + '/catalog/api/product/vendor/' + this.selectedItem.id + "/" + this.currentCount)
	.map(res => res.json()).subscribe(data => {
        this.posts = data;
		this.products = [];
		for (let i = 0; i < this.posts.length; i++) {
			if(this.posts[i].name!=null)
			{
					this.products.push({
					id: this.posts[i]._id,
					name: this.posts[i].brand + " " + this.posts[i].name,
					price:this.posts[i].mrp,
					url:this.url + this.posts[i].image_urls[0],
					weight: this.posts[i].weight,
					uom: this.posts[i].uom,
					inventory_id:this.posts[i].inventory_id,
					sale_price:this.posts[i].saleprice,
					quantity:this.posts[i].quantity,
					veg_non_veg: this.posts[i].veg_non_veg					
					});
			}	
		}

		if(navParams.get("scrollItem2")!= undefined){
			this.scroll=navParams.get('scrollItem2');
			
			
			this.products=this.branditems;

		}
			});
	});
	// // if(navParams.get("scrollItem3")!= undefined){
	// if(this.item){
	// 	this.currentCount=1;
	// 	this.http.get(this.url + '/catalog/api/products/category/' + this.vendor.id + "/" + this.item.id + "/" + + this.currentCount)
	// 	.map(res => res.json()).subscribe(data => {
	// 		this.elements = data;

	// 		this.products=this.elements;
	// 		console.log("elements",this.elements)
	// 	})
	// }


	this.getCartCount();
	// this.sendvendor();

  }
//   getCartCount(){ //craete this as a service function 
// 	console.log("getCartCount:"+this.url);
// 	this.http.get(this.url + '/order/api/ecart/customer/' + this.token.CustomerID).map(res => res.json()).subscribe(data => {
// 		this.cartCount = data.length;
// 		console.log(this.cartCount)
// 	});
//   }
  getCartCount(){ //craete this as a service function 
	
	this.http.get(this.url + '/order/api/ecart/customer/' + this.token.CustomerID).map(res => res.json()).subscribe(data => {
		this.cartCount = data.length;
	});
  }
  
  
  ViewProduct(event, product) {
	  
    this.navCtrl.push(productDetailPage, {
      product: product
    });
  }
  
  doInfinite(infiniteScroll) {
	  
	this.currentCount = this.currentCount + 1;
	this.http.get(this.url + '/catalog/api/product/vendor/' + this.selectedItem.id + "/" + this.currentCount).map(res => res.json()).subscribe(data => {
        this.posts = data;
		console.log(this.posts);
		
		for (let i = 0; i < this.posts.length; i++) {
			if(this.posts[i].name!=null)
			{

					this.products.push({
					id: this.posts[i]._id,
					name: this.posts[i].brand + " " + this.posts[i].name,
					price:this.posts[i].mrp,
					url:this.url + this.posts[i].image_urls[0],
					weight: this.posts[i].weight,
					uom: this.posts[i].uom,
					inventory_id:this.posts[i].inventory_id,
					sale_price:this.posts[i].saleprice,
					quantity:this.posts[i].quantity,
					veg_non_veg: this.posts[i].veg_non_veg
					});		
		}
		}
		infiniteScroll.complete();
	});
     
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
						this.getCartCount();
					});	
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
		vendor : this.selectedItem,
		items:this.branditems,
		checkedbrands:this.checkeditem,
	  });
}


  
	govendorcategory($event){
		console.log(this.selectedItem);
		this.navCtrl.push(CategoriesPage, {
			
			vendor : this.selectedItem
			
		  });
	}

   myFilter : string;
      onFilter(event)
      {
        
              if (this.myFilter){
          		this.navCtrl.push(VendorFilterItemPage, {
          		myFilter : this.myFilter,
          		vendor_id : this.selectedItem.id

          		});
          		}
	  }
	  
	  

}
