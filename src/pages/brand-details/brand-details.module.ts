import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandDetailsPage } from './brand-details';

@NgModule({
  declarations: [
    BrandDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandDetailsPage),
  ],
})
export class BrandDetailsPageModule {}
