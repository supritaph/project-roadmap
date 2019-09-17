import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SortItemsPage } from './sort-items';

@NgModule({
  declarations: [
    SortItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(SortItemsPage),
  ],
})
export class SortItemsPageModule {}
