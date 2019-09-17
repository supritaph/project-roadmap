import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';


import { BehaviorSubject } from 'rxjs';
import {  map, tap} from 'rxjs/operators';
import { place } from '../../app/place.model';
// import { Item } from 'ionic-angular';
import { SortItemsPage } from '/home/suprita/Desktop/final-roadmap/src/pages/sort-items/sort-items';


interface ProductData {                                  /*interface will help to arrange the arguments and can use those arg anywhere in the class  */
  id: string,
    barcode: number,
     brand: string,
      category_id:number,
      code:number,
      currency: number,
     
      description: string,
      image_url: string,
      name: string,
    weight: number,
      price: number,
      type: string,
     veg_non_veg: string,
uom: string,
cess: number,
cgst: number,
igst: number,
sgst: number,
category:string,
userId: string
}

@Injectable()
export class ProductProvider {
  public _products = new BehaviorSubject<place[]>([]);     /*behavious sub is a observable it will will return subscribe value if functun return nothing*/
  data: any;
 
  minPrice : Number;
  maxPrice : Number;
  minweight : Number;
  weightmin : Number;
  weightmax : Number;
 newArray: Array<any> = [];
 newrange2: Array<any> = [];
    maxWeight:Number;
    productS:any;
    newProduct:Array<any> = [];
    // brandMatch: string;
    brandMatch: Array<any> = [];
    priceMatch: Array<any> = [];
   task:any;
  get products() {
    return this._products.asObservable();
  }

  // _newrange2: [];

  constructor( private http: HttpClient, 
    ) {
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.minweight=1;
    this.maxWeight = 10000;
    this.brandMatch=[];
    this.newArray = ["0-0"];
    this.priceMatch=[];
    this.newArray = ["0-0"];
    this.weightmax=10000;
    this.weightmin=1
    // for(var k=0;k<this.newArray.length ;k++)
    // {
    //   this.newArray.length[k].checked = false;
    // } 
    // console.log(this.newArray);
    
    
  
    }
    // @Input()
    // set newarray1(myarray: [] ){
    //   this._newarray1= myarray;
    // }
    // get newarray1()
    // {
    //   return this._newarray1;
    
    
    // }
    
//        public newfunc(): void{
//          this.sortItem.checked(this.task, event);

// this.newrange2= newrange;
//        } 
// getrange(): void {
//   this.sortItem.checked(this.task, event)
//       .then(newrange => {
//          this.newrange2 = newrange
//          console.log("this.newrange=" + this.newrange2);
//       });
// }
      

    // }
    // newfunction() {
   
    //   console.log("init ")
    //   // this.productS = this.sortitem.checked(this.task);
    //   // this.newArray.push(this.minPrice);
    //   // console.log("minprice",this.minPrice)
    //   // this.productS = this.sortitempage.checked(this.task);
    //   // console.log("newtask",this.task);
        
    // this.newProduct.push(this.maxPrice+""+this.minPrice);
    // console.log("minmax", this.newProduct);
        
    
    // }
  
    
    
  
  fetchPlaces() {
    //console.log("Here");
    return this.http.get(
        
        'http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/3'

      )
      // this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
      .pipe(
        map(resData => {
          //console.log(resData);
          const productel = [];
          for (const s in resData) {
            if (resData.hasOwnProperty(s))
             {          /*hasownproperty specifies wheather it specifies its own property */
              
              var server_Url = "http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com";
              var str= server_Url+""+resData[s].image_url ;
              var image_url_new= str;
              console.log(image_url_new);
              
              productel.push(
                new place(
                  s,
                  resData[s]._id,
                  resData[s].barcode,
                  resData[s].brand,
                  resData[s].category_id,
                  resData[s].code,
                  resData[s].currency ,
                  resData[s].description,
                  image_url_new,
                  resData[s].name,
                  resData[s].weight ,
                  resData[s].price,
                  resData[s].type,
                  resData[s].veg_non_veg,
                  resData[s].uom,
                  resData[s].cess,
                  resData[s].cgst,
                  resData[s].igst,
                  resData[s].sgst,
                  resData[s].category,
                  
                  )
                 
              );
              //console.log(productel);
              // console.log(this.productel)   /*displays response*/
            }
          }
          console.log(productel)
          return productel;  /*return elements*/
          // return [];
        }),
        tap(productel => {   /**accepts another data */
          this._products.next(productel);
         
        })
      );
    
  }
  // filter(searchTerm){
  //   return this.data.filter((resData) => {
  //     return place.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //   });
  // }
  
// newcalc()
// {
//   this.newArray.push(this.minPrice);
//   console.log("newcalc",this.minPrice +""+this.maxPrice);
// } 

}

