import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';

import { range } from 'rxjs/observable/range';
import { ProductsPage } from '../products/products';
/**
 * Generated class for the NewWeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-weight',
  templateUrl: 'new-weight.html',
})
export class NewWeightPage {
  newBrand: Array<any> = [];
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  productSub: any;
  items: place[];
  minimumweight: number;
  maximumweight: number;
  price: number;
  applyFilterPrice: any;
  input:place[];
  output = [];
  radios=range;
   val:string;
   radioVal:number;
   rangeObject:any;
  //  isChecked = false;
  range = [];
  newrange = [];
  uniquerange = [];
  newrange12 = [];
  selectedItem: any='';
  newArray: Array<any> = [];
  newArray2: Array<any> = [];
  newrange123:Array<any> = [];
  newone:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductProvider, ) {
      this.maximumweight=100, this.minimumweight=20;
      this.input = [];
       this.rangeObject= {lower:0, upper:300};
      //  this.productService.minweight = this.rangeObject.lower;
      // this.productService.maxWeight = this.rangeObject.upper;

    }
    noteChanged($event, rangeObject)
    {
      // console.log("rangeobj",event)
      console.log("rangeobj",rangeObject)

      console.log("lower",rangeObject.lower)
      console.log("upper",rangeObject.upper)
     // this.newrange.push(rangeObject);

       this.productService.weightmin = this.rangeObject.lower;
      this.productService.weightmax = this.rangeObject.upper;
      
      
    //   for(var i=0; i<this.items.length; i++){
    //     if (this.items[i].weight >=this.rangeObject.lower && this.items[i].weight <= this.rangeObject.upper ) {
    //       this.newArray2.push(this.items[i]);
          
         
    //     }
    //     break;
    // }
    //   console.log("newitems",this.newArray2);
           
     
    }
      
      
      //console.log("new range",this.newrange);
      
    
    // checked($event, task){
    //   console.log("task are",task)
    //   // task = task.split(':')
    //    console.log("task are",task.split('-')[0]+" "+task.split('-')[1]);

    //   // this.newrange.push(Math.round(task.split('-')[0]));
    //   // this.newrange.push(Math.round(task.split('-')[1]));
      
    //   // console.log("new range",this.newrange);
    //   const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
    //   ///console.log("max",max);
    //   const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
    //   console.log("max1",maximum);
    //   console.log("min1",minimum);
    //  // console.log("123",this.items[i].price <= maximum && this.items[i].price >= minimum)
    //   this.minimumweight = minimum;
    //   this.maximumweight = maximum;
      
    //   console.log("newRanfh111"+this.newrange)   
      

    //   this.productService.minweight = this.minimumweight;
    //   this.productService.maxWeight = this.maximumweight;
    //   for(var i=0; i<this.items.length; i++){
    //     if (this.items[i].weight >= minimum && this.items[i].weight <= maximum ) {
    //       this.newArray2.push(this.items[i]);
    //       console.log("newitems",this.newArray2);
          
    //     }
    // }
    //   console.log("newitems",this.newArray2);
           
     
    // }

    
    onSubmit(){
      console.log("minimum price",this.minimumweight);
      // this.productService.minweight = this.minimumweight;
      // this.productService.maxWeight = this.maximumweight;
      this.productService.weightmin = this.rangeObject.lower;
      this.productService.weightmax = this.rangeObject.upper;
      this.navCtrl.push(ProductsPage);
    }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad SortItemsPage');
  }
  ngOnInit() {
   
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init function subscribe");
   
      this.items = productel;/*hence items refer to elements in place[] */
      console.log(this.items);

var abcd = [], l = this.items.length;
// var range = [];
for( var i=0; i<l; i++) {
    if( abcd[this.items[i].weight]) continue;
    abcd[this.items[i].weight] = true;
    this.output.push(this.items[i].weight);

                }
                //console.log("unique prices from array")
                console.log("items are",this.output);
                //console.log("max and min value from that unique prices")
                 var max = this.output.reduce((a, b) => Math.max(a, b));
                console.log("1)max",max);
                var min = this.output.reduce((a, b) => Math.min(a, b));
                console.log("2)min", min);
                this.productService.minweight = min;
                this.productService.maxWeight = max;
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
       
           
            }
            
           
        
          
        



              
            

            







  
   
    
      
  

  

  
    
  

 
