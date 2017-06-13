import { Component } from '@angular/core';

import {NavController, NavParams, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlaceDetailsPage } from '../place-details/place-details';
import {Place} from "../../models/place";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  places: Array<Place> = [];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.places = [];

    platform.ready().then(()=> {
      this.storage.forEach( (value, key, index) => {
        this.places.push(value);
        console.log(this.places);
      });
    });
  }

  itemTapped(event, item) {
    console.log(item);
    this.navCtrl.push(PlaceDetailsPage, {
      item: item
    });
  }
}
