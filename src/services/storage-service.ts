import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import {Place} from "../models/place";
/**
 * Created by analbessar on 13/06/17.
 */

@Injectable()
export class StorageService {

  constructor(private storage: Storage){}

  getPlaces(places: Array<Place>){
    this.storage.ready().then(() => {
      this.storage.forEach( (value, key, index) => {
        places.push(value);
        console.log('In storage service: ', places);
      });
    });
  }

  addPlace(place: Place){
    this.storage.ready().then(() => {
      this.storage.length().then((l) => {
        // set a key/value
        this.storage.set(l.toString(), place);
      });
    });
  }
}
