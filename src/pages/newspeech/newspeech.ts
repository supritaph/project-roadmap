import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
/**
 * Generated class for the NewspeechPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newspeech',
  templateUrl: 'newspeech.html',
})
export class NewspeechPage {
  matches: String[];
  isRecording = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cd: ChangeDetectorRef,
    private speechRecognition:SpeechRecognition,

    private plt: Platform) {
      // this.getPermission();
      // this.startListening();
      // this.stopListening
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductsPage');
  }

  // isIos() {
  //   return this.plt.is('ios');
  // }
  // stopListening() {
  //   this.speechRecognition.stopListening().then(() => {
  //     this.isRecording = false;
  //   });
  // }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
    
  }
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

}
