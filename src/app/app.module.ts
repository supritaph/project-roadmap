import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { ProductsPage } from '../pages/products/products';
import { ProductProvider } from '../providers/product/product';

import { SearchItemsProvider } from '../providers/search-items/search-items';
import { ItemsearchPage } from '../pages/itemsearch/itemsearch';
import { FilterItemPage } from '../pages/filter-item/filter-item';
import { FormsModule } from '@angular/forms';
import { ItemsProvider } from '../providers/items/items';
import { HttpModule } from '@angular/http';
import { SortItemsPage } from '../pages/sort-items/sort-items';
import { BrandDetailsPage } from '../pages/brand-details/brand-details';
import { WeightPage } from '../pages/weight/weight';
import { NewProductsPage } from '../pages/new-products/new-products';
import { NewWeightPage } from '../pages/new-weight/new-weight';
import { TryNewPage } from '../pages/try-new/try-new';
import { NewspeechPage } from '../pages/newspeech/newspeech';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    ProductsPage,
    FilterItemPage,
    NewWeightPage,
    NewspeechPage,
   
    ItemsearchPage,
    BrandDetailsPage,
    SortItemsPage,
    WeightPage,
    NewProductsPage,
   
    TryNewPage
   
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    
    
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WeightPage,
    SignupPage,
    LoginPage,
    ProductsPage,
    NewWeightPage,
    FilterItemPage,
    SortItemsPage,
    BrandDetailsPage,
    NewProductsPage,
 TryNewPage,
 NewspeechPage,
 
    ItemsearchPage 
  ],
  providers: [
    StatusBar,

    SplashScreen,
    SpeechRecognition,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    SearchItemsProvider,
    ItemsProvider,
    // SearchItemsProvider,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
