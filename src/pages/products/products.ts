import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { place } from '../../app/place.model';
import { ProductProvider } from '../../providers/product/product';
import { SortItemsPage } from '../sort-items/sort-items';
import { BrandDetailsPage } from '../brand-details/brand-details';
import { WeightPage } from '../weight/weight';


/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  
  searchTerm: string ;
  searchElement: string ;
  // filterItems:any;
  // loadedPlaces: place[];
  items: place[];
  items2:place[];
  productSub: any;
   arrayObj : any;
   objectData : any;
  // filterData = [];
  // private productSub: Subscription;
 
  // searchBoxValue: any;
  arr:any;
  // brandMatch:place[];
  arrayLength: place[];
  modeKeys:any[];
  zone:any;
  //  arrayLength = place.length;

  constructor(
    private productService: ProductProvider,
    public navCtrl: NavController
  
   
  ) {
    this.items = [];
    this.zone = {
      kind: 'key2'
    }
    this.modeKeys = [
      'key1',
      'key2',
      'key3',
      'key4',
    ]
   
    
  }


  ngOnInit() {
    console.log("init function start");
    
    // console.log(""+this.filterItem(this.items,this.namekey));
  }

  ionViewWillEnter() {
    console.log("viewEnter");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init function subscribe");
      // for(i=0; i<this.items.length; i++){
        
      //   this.productService.brandMatch.push(this.items[i]);
      //     // console.log("newBrandmatch",this.productService.brandMatch);
      //   }
     // console.log(productel);
     this.items = [];
     console.log(this.productService.minPrice);
     console.log(this.productService.maxPrice);
     console.log(this.productService.priceMatch);
     console.log(productel.length);
     for(var i=0;i<productel.length;i++){
      //  this.items.push(productel[i]);

       console.log("brandmatch",this.productService.brandMatch);
       console.log("weightmax",this.productService.weightmax )
       console.log("weightmin",this.productService.weightmin )
       if(this.productService.brandMatch.length == 0){
        
        //check both status of price
        if(this.productService.priceMatch.length == 0){
            //0
            // if(this.productService.weightmax && this.productService.weightmin == 0){
            this.items.push(productel[i]);
            // }
        }
        //0
        if(this.productService.weightmax && this.productService.weightmin == 0){
        
          this.items.push(productel[i]);
        
        }
        else{
          //price !0
          for(var p = 0;p<this.productService.priceMatch.length;p++){
            var min = this.productService.priceMatch[p].split('-')[0];
            var max = this.productService.priceMatch[p].split('-')[1];
            if ((productel[i].price >= min 
              && productel[i].price <= max)){
                this.items.push(productel[i]);
              }
              
          }
          
        }
       
      }
    
      else{
               
        //check both status of price
        if(this.productService.priceMatch.length == 0){
          //0
          for(var p = 0;p<this.productService.brandMatch.length;p++){
            var brand = this.productService.brandMatch[p];
            if (productel[i].brand === brand){
                this.items.push(productel[i]);
              }
          }
        }
        //
        if(productel[i].weight >= this.productService.weightmin
          && productel[i].weight <= this.productService.weightmin)
          {
            this.items.push(productel[i]);
               
               console.log("weightitems",this.items); break;
          }
        
        else{
          //not 0 but both are 1
          for(var p = 0;p<this.productService.brandMatch.length;p++){
            var brand = this.productService.brandMatch[p];
            for(var k=0;k<this.productService.priceMatch.length;k++){
              var min = this.productService.priceMatch[k].split('-')[0];
              var max = this.productService.priceMatch[k].split('-')[1];
              var wmin = this.productService.weightmin;
              var wmax=this.productService.weightmax;
              if (productel[i].brand === brand && ((productel[i].price >= min 
                && productel[i].price <= max)) && ((productel[i].weight >= wmin 
                  && productel[i].weight <= wmax))  ){
                this.items.push(productel[i]);
                break;
              }
            }            
          }
        }
      }

       
      // if(this.productService.brandMatch.length == 0){
      //   //check both status of price
      //   if(this.productService.priceMatch.length == 0){
      //       //0

      //       this.items.push(productel[i]);
      //   }else{
      //     //price !0
      //     for(var p = 0;p<this.productService.priceMatch.length;p++){
      //       var min = this.productService.priceMatch[p].split('-')[0];
      //       var max = this.productService.priceMatch[p].split('-')[1];
      //       if ((productel[i].price >= min 
      //         && productel[i].price <= max)){
      //           this.items.push(productel[i]);
      //         }
      //     }
      //   }
      // }else{
      //   //check both status of price
      //   if(this.productService.priceMatch.length == 0){
      //     //0
      //     for(var p = 0;p<this.productService.brandMatch.length;p++){
      //       var brand = this.productService.brandMatch[p];
      //       if (productel[i].brand === brand){
      //           this.items.push(productel[i]);
      //         }
      //     }
      //   }else{
      //     //not 0 but both are 1
      //     for(var p = 0;p<this.productService.brandMatch.length;p++){
      //       var brand = this.productService.brandMatch[p];
      //       for(var k=0;k<this.productService.priceMatch.length;k++){
      //         var min = this.productService.priceMatch[k].split('-')[0];
      //         var max = this.productService.priceMatch[k].split('-')[1];
      //         if (productel[i].brand === brand && ((productel[i].price >= min 
      //           && productel[i].price <= max))){
      //           this.items.push(productel[i]);
      //           break;
      //         }
      //       }            
      //     }
      //   }
      // }


      /* if(this.productService.brandMatch.length == 0){
        if ((productel[i].price >= this.productService.minPrice 
          && productel[i].price <= this.productService.maxPrice)
           && (productel[i].weight >= this.productService.minweight 
           && productel[i].weight <= this.productService.maxWeight)) {
          this.items.push(productel[i]);
         console.log("priceitems-0",this.items)
        }
       }else{
         for(var k = 0;k<this.productService.brandMatch.length;k++){
           var brand_name = this.productService.brandMatch[k];
           console.log("Brand_Name:"+brand_name);

           for(var l=0;l<this.productService.priceMatch.length;l++){
              var min = this.productService.priceMatch[l].split('-')[0];
              var max = this.productService.priceMatch[l].split('-')[1];
              if ((productel[i].price >= min 
                && productel[i].price <= max)
                 && (productel[i].weight >= this.productService.minweight 
                 && productel[i].weight <= this.productService.maxWeight)
                 && productel[i].brand===brand_name) {
                this.items.push(productel[i]);
               
               console.log("priceitems",this.items); break;
              }
           }           
         }
        
       }*/
    }
    console.log("mathced items - ",this.items) 
  // }
  // console.log("brandmatch",this.items)  


    //  this.items = [];
    //  console.log(this.productService.minweight);
    //   console.log(this.productService.maxWeight);
    //   console.log(productel.length);
    //   for( i=0;i<productel.length;i++){
    //    if (productel[i].weight >= this.productService.minweight && productel[i].weight <= this.productService.maxWeight ) {
    //      this.items.push(productel[i]);
        
    //    }
    //  }
      

    //  console.log(this.productService.minweight);
    //  console.log(this.productService.maxWeight);
    //  console.log(productel.length);
    //  for( i=0;i<productel.length;i++){
    //   if (productel[i].weight >= this.productService.minweight && productel[i].weight <= this.productService.maxWeight ) {
    //     this.items.push(productel[i]);
       
    //   }
    // }
     
     // this.items = productel;/*hence items refer to elements in place[] */
      
    
      
    });
    
  }
//   send(){
//     this.items = this.items.sort((n1,n2) => {
//     if (n1 < n2) {
//         return 1;
//     }

//     if (n1 > n2) {
//         return -1;
//     }

//     return 0;
// });
//   }
sort(){
  console.log("hi");
  this.navCtrl.push(SortItemsPage)
  
}
brandname()
{
  this.navCtrl.push(BrandDetailsPage);
}
weight(){
  this.navCtrl.push(WeightPage);
}

  filterItem(){  /*this fun is to search items in an displayed array list */
       
    this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  console.log(this.items);   /*tolowercase fun makes a input in to all low case and returns -1 if not match */
}/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
// sort(array:any[],property:string,isNumber:boolean){
//   if(isNumber){
//       return array.sort((item1,item2)=> {
//           return (item1[property] > item2[property]) ? 1 : -1;});
//   }else{
//       return array.sort((item1,item2)=> {
//           return (item1[property].toLowerCase() > item2[property].toLowerCase()) ? 1 : -1;});
//   }
// }

}
//   filterItem() {
//     for (var i = 0,len = this.items.length; i < len; i++) {
//         if ( place[i] === this.arrayLength ) { 
//             // return place[i];
//             console.log(place[i])
//         }
//     }
//     return -1;
// }
// filterItem(namekey: place[]){
//   for (var i=0; i <place.length; i++) {
//       if (place[i] === namekey) {
//           return place[i];
//       }
//       return 0;
//   }
// }
// }
// filterItem(a1: any[], race: any): any {
//   let filteredItems : any[] = new Array();
//   if (race != undefined) {
//     // filter items array, items which match and return true will be kept, false will be filtered out
//       a1.forEach((card)=>
//       {
//           card.forEach((item)=> {
//               let temp= item.racesOrTraits.toLowerCase().includes(race.toLowerCase());
//               if(temp){
//                   filteredItems.push(card);
//               }
//           })

//       })
//    return filteredItems;
// }
// }


/*refer */
// filterItem(namekey,a1){

//   for (let index = 0; index < this.items.length; index++) {
//     this.arrayObj = this.items[index];
//     this.arrayObj.filter((x) => {
//       if (x.name === name) {
//         this.objectData = x;
//       }
//     });
//     console.log('Json Object Data by ID ==> ', this.objectData);
//   }
// };

    // for (var i=0; i <this.items.length; i++) {
    //     if (this.items[i] === namekey) {
    //         return this.items[i];
    //     }
    //     return -1;
    // }


   
  
  // }
//   filterItem(arr)
//   {
//     arr=this.items[name];
//     // this.arr= this.items;
//     for(var i=0; i<arr.length; i++)
//     {
//       if(this.items[name]===arr[name])
//       {
//         return arr[name];
//       }
// return -1;
//     }
//   }


//   filterItem(){
//     for (var i=0,len=this.items.length; i<len; i++){
//       if(this.items[i]===this.searchTerm){
//         return this.items;
//       }
//     }
// return -1;
//   }
// }
//   filterItem(){ /*function */
//     // angular.forEach(this.items, function(item, index) {
//     //   console.log(item, index);
//     // });
//     this.items.forEach(function(items)
//  {
//    if(items.name == 'searchTerm')
//         {
//           alert('Item Exist');
//         }
//  });
//   }
//     }


  //   filterItem(){
       
  //     this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  //   console.log(this.items);
  // }/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
  // }
//     filterItem(arr) {
//       for(var i = 0; i < arr.length; i++) {
//           if(this.items == arr[i])
//               return true;
//       }
//       return false;
//   } 
// }
//   filterItem(){ /*function */
//     // angular.forEach(this.items, function(item, index) {
//     //   console.log(item, index);
//     // });
//     for (var i = 0; i < this.items.length; i++) {
//       if (place[i] === 'searchTerm') 
//       {   
//          alert('Value exist');
//          console.log(this.items);
//       }else{
//          alert('Value doesnot exist');
//       }
//     }
//   }
// }
 
//   assignCopy(){
//     this.items = Object.assign([], this.items);
//  }
//  filterItem(value){
//     if(!value){
//         this.assignCopy();
//     } // when nothing has typed
//     this.items = Object.assign([], this.items).filter(
//        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
//     )
//  }
//  this.assignCopy();//when you fetch collection from server.

   
 
  //   this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  //   console.log(this.items);
  // }/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
  // }
 
//   filterItem(value){
//     if(!value){
//         this.assignCopy();
//     } // when nothing has typed
//     this.items = Object.assign([], this.items).filter(
//        item => item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
//     )
//  }
//  this.assignCopy();//when you fetch collection from server.
//   initiazileItems(){
//     this.items= this.items;
//   }
// }
 
  // getItems(ev:any){
  //   this.initiazileItems();
  //   let val = ev.target.value;
  // }
 
  // filterItems(ev: any) {
  //    this.productSub();
     
  //    let val = ev.target.value;
  //    if (val && val.trim() != '') {
  //      this.items = this.items.filter((item) => {
  //        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //      })
  //    }
  //  }

  // searchCountry(searchbar) {
  //   // reset countries list with initial call
  //   this.items = this.filterData;

  //   // set q to the value of the searchbar
  //   var q = searchbar.value;

  //   // if the value is an empty string don't filter the items
  //   if (q.trim() == '') {
  //       return;
  //   }

  //   this.items = this.items.filter((v) => {
  //       if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //           return true;
  //       }
  //       return false;
  //   })

  // setFilteredLocations(){
  //   return this.productService.filterLocations(this.searchTerm);
  // }
  // setFilteredLocations(ev: any){
  //   let val = ev.target.value;

  //   if (val && val.trim() !== '') {
  //     return this.productService.filterLocations(val);
  //   }

  // }

