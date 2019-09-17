import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { place } from '../../app/place.model';
import { ProductProvider } from '../../providers/product/product';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {
  productSub: any;
  items: place[];
  newrange = [];
  input:place[];
  minimumweight: number;
  maximumweight: number;
  newweight: Array<any> = [];
  range: Array<any> = [];
  range22: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  output: Array<any> = [];
  output22: Array<any> = [];
  outputUnique: Array<any> = [];
  newArray: Array<any> = [];
  newArray2: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private productService: ProductProvider,) {
    this.maximumweight=100, this.minimumweight=10;
    this.input = [];
  }

  checked($event, task){
    console.log("task are",task)
    console.log("task are",task.split('-')[0]+" "+task.split('-')[1]);
    // task = task.split(':')
    // console.log("task are",task)
  //  var  steps = ~~Math.log10(task)/2;
  //   for(var i = 0; i <= steps; i++) {
  //     this.newrange.push(Math.round(((task /= 100)%1)*100));
  //     task = Math.trunc(task);
  //   }
  this.newrange.push(Math.round(task.split('-')[0]));
      this.newrange.push(Math.round(task.split('-')[1]));
    console.log("new range",this.newrange);
    const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
    ///console.log("max",max);
    const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
    console.log("max1",maximum);
    console.log("min1",minimum);
    console.log("123",this.items[i].weight <= maximum && this.items[i].weight >= minimum)
    this.minimumweight = minimum;
    this.maximumweight = maximum;
  
    this.productService.minweight = this.minimumweight;
    this.productService.maxWeight = this.maximumweight;
    for(var i=0; i<this.items.length; i++){
      if (this.items[i].weight >= minimum && this.items[i].weight <= maximum ) {
        this.newArray2.push(this.items[i]);
        // console.log("newitems",this.newArray2);
      }
  }
    console.log("newitems",this.newArray2);
   
  
  }

  onSubmit(){
    this.productService.minweight = this.minimumweight;
    this.productService.maxWeight = this.maximumweight;
    this.navCtrl.push(ProductsPage);
  
  }
  ionViewDidLoad()  {
    // this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      // console.log("init",productel);
    console.log('ionViewDidLoad BrandDetailsPage');
  // })

}

  ngOnInit() {
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {
      console.log("init function subscribe");
    
      this.items = productel;
      console.log(this.items);
      this.newWeight();
     
    });
    
  }

  
  newWeight()
{
  for(var i=0; i<this.items.length; i++)
  {
    console.log("newweight",this.items[i].weight);
    this.newweight.push(this.items[i].weight);
    
    console.log("newarraybrand is",this.items[i].weight);
    
  //   this.sortedArray2 = this.newweight.sort((n1,n2) => {
  //    if (n1 > n2) {
  //        return 1;
  //    }
 
  //    if (n1 < n2) {
  //        return -1;
  //    }
 
  //    return 0;
 
    
  //   });
    
 
  // }
  // console.log("sortweight",this.sortedArray2);

  var temparray = [];
for( i=0; i<this.items.length; i++) {
    if( temparray[this.items[i].weight]) continue;
    temparray[this.items[i].weight] = true;
    this.output.push(this.items[i].weight);
}
console.log("output",this.output);
this.sortedArray2 = this.output.sort((n1,n2) => {
  // if (n1 > n2) {
  //     return 1;
  // }

  if (n1 < n2) {
      return -1;
  }

  return 0;

 
 });
 

}
console.log("sortweight",this.sortedArray2);
console.log("items are",this.output);
                //console.log("max and min value from that unique prices")
                const max = this.sortedArray2.reduce((a, b) => Math.max(a, b));
                console.log("1)max",max);
                const min = this.sortedArray2.reduce((a, b) => Math.min(a, b));
                console.log("2)min", min);
                console.log("displaying index and iteration to bring c values to find range to display")
                var c=(min+max)/10;
                for( i=min; i<max; i=i+c)
                {
                  console.log("weight from"+ Math.round(i)+ "to"  +Math.round((i+c))+ "" +c);
                  //this is the range code
                  this.range.push(Math.round(i)+ "-"  +Math.round((i+c)))
                  //this.range.push(Math.round(i));
                  //this.range.push(Math.round((i+c)));
                
                }
                console.log("actual weight range",this.range);


}



  
}