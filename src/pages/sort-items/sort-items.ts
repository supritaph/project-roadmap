import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';

import { range } from 'rxjs/observable/range';
import { ProductsPage } from '../products/products';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-sort-items',
  templateUrl: 'sort-items.html',
})
export class SortItemsPage {
  newBrand: Array<any> = [];
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  items123:Array<any> = [];
  productSub: any;
  items: place[];
  productS: any;
  minimumPrice: number;
  maximumPrice: number;
  price: number;
  applyFilterPrice: any;
  input:place[];
  output = [];
  radios=range;
   val:string;
   radioVal:number;
 
  range = [];
  newrange = [];
  uniquerange = [];
  newrange12 = [];
  compareMAx=[];
  compareMin=[];
  selectedItem: any='';
  newArray: Array<any> = [];
  newArray2: Array<any> = [];
  priceItem:Array<any> = [];
  newone:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductProvider, ) {
      this.maximumPrice=100, this.minimumPrice=20;
      this.input = [];
      this.newArray2 = this.productService.priceMatch;
      
    }
    
     checked(event,task){
      console.log("task are",task)
      if(event.checked == true){
        //if checked then add the value to new array
        //before adding check if it exists then add to newarray
        if(this.newArray2.indexOf(task)!=-1){
          //brand exists so do nothing
        }else{
          this.newArray2.push(task);
        }
      }else{
        console.log("unchecked");
        //if unchecked - then check if array has that value and remove from the array
        console.log(this.newArray2);
        if(this.newArray2.indexOf(task)!=-1){
          console.log("exists");
          
          //brand exists so remove that element
          for(var k = 0 ;k<this.newArray2.length;k++){
            if(this.newArray2[k] === task){
              this.newArray2.splice(k,1);
            }
          }
        }else{
         
        }
      }
       
      //  console.log("newarray",this.newArray2);
          this.newrange.push(Math.round(task.split('-')[0]));
       this.newrange.push(Math.round(task.split('-')[1]));
       console.log("newrange",this.newrange);

       const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
       console.log("1)max",maximum);
       const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
       console.log("2)min", minimum);
          this.minimumPrice = minimum;
       this.maximumPrice = maximum;

       this.productService.minPrice = this.minimumPrice;
         this.productService.maxPrice = this.maximumPrice;

      //   for(var i=0; i<this.items.length; i++){
      //     if (this.items[i].price >= minimum && this.items[i].price <= maximum ) {
      //       this.priceItem.push(this.items[i]);
            
      //       console.log("newitems",this.priceItem);  
      //     }
          
      // }

// console.log("minimum",this.minimumPrice)
      // task = task.split(':')

    //    console.log("task are",task.split('-')[0]+" "+task.split('-')[1]);

     
    //   this.newrange.push(Math.round(task.split('-')[0]));
    //   this.newrange.push(Math.round(task.split('-')[1]));
    //   this.productService.newArray.push(task); //i said to do this
      
    //   console.log("new range",this.newrange);

    //   const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
      
    //   const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
    //   console.log("max1",maximum);
    //   console.log("min1",minimum);
     
    //  // console.log("123",this.items[i].price <= maximum && this.items[i].price >= minimum)
    //   this.minimumPrice = minimum;
    //   this.maximumPrice = maximum;
     
    //   console.log("newRanfh111"+this.newrange)   
    //   // console.log("justcheck",this.productService.minPrice>=this.minimumPrice || this.productService.maxPrice<=this.maximumPrice)   

    //   this.productService.minPrice = this.minimumPrice;
    //   this.productService.maxPrice = this.maximumPrice;
    //   for(var i=0; i<this.items.length; i++){
    //     if (this.items[i].price >= minimum && this.items[i].price <= maximum ) {
    //       this.newArray2.push(this.items[i]);
    //       console.log("newitems",this.newArray2);
          
    //     }
    // }
    //   console.log("newitems",this.newArray2);       
    //     this.compareMAx.push(this.productService.maxPrice);
    //     console.log("compareMax", this.compareMAx);

    //     this.compareMin.push(this.productService.minPrice);
    //     console.log("compareMin", this.compareMin);
    }
  
    onSubmit(){
      console.log("minimum price",this.minimumPrice);
      this.productService.minPrice = this.minimumPrice;
      this.productService.maxPrice = this.maximumPrice;
      this.productService.priceMatch = this.newArray2;
      this.navCtrl.push(ProductsPage);
      // console.log(this.productService.newcalc);
    }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad SortItemsPage');
     
  }
  ngOnInit() {
   
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init function subscribe");
    //  console.log(productel);
      this.items = productel;/*hence items refer to elements in place[] */
      console.log(this.items);

var abcd = [], l = this.items.length;

for( var i=0; i<l; i++) {
    if( abcd[this.items[i].price]) continue;
    abcd[this.items[i].price] = true;
    this.output.push(this.items[i].price);

                }
                
                console.log("items are",this.output);
              
                const max = this.output.reduce((a, b) => Math.max(a, b));
                console.log("1)max",max);
                const min = this.output.reduce((a, b) => Math.min(a, b));
                console.log("2)min", min);
                console.log("displaying index and iteration to bring c values to find range to display")
                var c=(min+max)/10;
                for( i=min; i<max; i=i+c)
                {
                  console.log("price from"+ Math.round(i)+ "to"  +Math.round((i+c))+ "" +c);
                  
                  this.range.push(Math.round(i)+ "-"  +Math.round((i+c)))
                  
                
                }
                console.log("actual range",this.range);

      
              })
             
              
            }
       
            onNext (eve)
            {
              
              console.log(this.range)

            }

            }
            
           
            
            
            
            
            
            
          
             
           
        
          
        



              
            

            















 
    
  

 
