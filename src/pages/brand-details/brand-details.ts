import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';
import { ProductsPage } from '../products/products';
// import { ProductsPage } from '../products/products';
// import { min } from 'rxjs/operators';

/**
 * Generated class for the BrandDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand-details',
  templateUrl: 'brand-details.html',
})
export class BrandDetailsPage {
  productSub: any;
  
  items: place[];
  brandName:string;
  newBrand: Array<any> = [];
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  output: Array<any> = [];
  newArray2: Array<any> = [];
  newArray3: Array<any> = [];
  output2: Array<any> = [];
  range1 = [];
  input:place[];
  Brandnew: Array<any> = [];
  checked1: boolean ;
  
  // ischecked=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private productService: ProductProvider,) {
    this.input = [];
    // this.Brandnew='';
    this.newArray2 = this.productService.brandMatch;

  }

  checked(event, task){
   
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
     
     console.log("newarray",this.newArray2);
}


  ionViewDidLoad() {
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init",productel);
    // console.log('ionViewDidLoad BrandDetailsPage');
  })

}

ngOnInit() {
  console.log("init function start");
  this.productSub = this.productService.fetchPlaces().subscribe(productel => {
    console.log("init function subscribe");
  
    this.items = productel;
    console.log(this.items);
    this.getUniqueElements();
  });
  
}
getUniqueElements()
{  
    var temparray = [];
    for( var i=0; i<this.items.length; i++) {
        if( temparray[this.items[i].brand]) continue;
        temparray[this.items[i].brand] = true;
        this.output.push(this.items[i].brand);
        console.log("output",this.output);
    }
}

      
          
            onSubmit(){
              // console.log("sub"+this.productService.brandMatch);
              console.log("Submit:"+this.Brandnew);
              this.Brandnew = this.newArray2;
              this.productService.brandMatch = this.Brandnew;  
              console.log("Submit:"+this.productService.brandMatch);
              this.navCtrl.push(ProductsPage);
        
            }
        
}



  