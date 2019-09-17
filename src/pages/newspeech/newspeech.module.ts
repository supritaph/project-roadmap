import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewspeechPage } from './newspeech';

@NgModule({
  declarations: [
    NewspeechPage,
  ],
  imports: [
    IonicPageModule.forChild(NewspeechPage),
  ],
})
export class NewspeechPageModule {}
