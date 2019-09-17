import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWeightPage } from './new-weight';

@NgModule({
  declarations: [
    NewWeightPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWeightPage),
  ],
})
export class NewWeightPageModule {}
