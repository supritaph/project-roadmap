import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsearchPage } from './itemsearch';

@NgModule({
  declarations: [
    ItemsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsearchPage),
  ],
})
export class ItemsearchPageModule {}
