import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TryNewPage } from './try-new';

@NgModule({
  declarations: [
    TryNewPage,
  ],
  imports: [
    IonicPageModule.forChild(TryNewPage),
  ],
})
export class TryNewPageModule {}
