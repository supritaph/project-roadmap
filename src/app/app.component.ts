import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController,  Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';


import { LoginPage } from '../pages/login/login';
import { FilterItemPage } from '../pages/filter-item/filter-item';
// import { SortItemsPage } from '../pages/sort-items/sort-items';
// import { ProductsPage } from '../pages/products/products';
// import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import { NewProductsPage } from '../pages/new-products/new-products';
import { BrandDetailsPage } from '../pages/brand-details/brand-details';
import { SortItemsPage } from '../pages/sort-items/sort-items';
import { WeightPage } from '../pages/weight/weight';
import { NewWeightPage } from '../pages/new-weight/new-weight';
import { TryNewPage } from '../pages/try-new/try-new';
import { NewspeechPage } from '../pages/newspeech/newspeech';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ProductsPage;
  // rootPage:any =NewProductsPage;
  // @ViewChild('nav') nav: NavController;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, 
    public menu: MenuController,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();

  }
  onLogout(){
    this.nav.push(LoginPage);
    this.menu.close();

  }
  SearchItem(){
    this.nav.push(FilterItemPage)
    this.menu.close();
  }
  onBrand(){
    this.nav.push(BrandDetailsPage)
    this.menu.close();
  }
  onprice(){
    this.nav.push(SortItemsPage);
    this.menu.close();
  }
  onweight(){
    // this.nav.push(WeightPage);
    this.nav.push(NewWeightPage);
    this.menu.close();
  }
  tryNew(){
    this.nav.push(TryNewPage);
    this.menu.close();
  }
  onspeech()
  {
    this.nav.push(NewspeechPage);
  }
  
 
}

