import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductsPage } from './new-products';

@NgModule({
  declarations: [
    NewProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductsPage),
  ],
})
export class NewProductsPageModule {}
