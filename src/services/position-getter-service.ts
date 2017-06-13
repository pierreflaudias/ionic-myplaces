import {Injectable} from "@angular/core";
import {Diagnostic} from "@ionic-native/diagnostic";
import {LocationAccuracy} from "@ionic-native/location-accuracy";
import {Place} from "../models/place";
import {Geolocation} from "@ionic-native/geolocation";
/**
 * Created by analbessar on 13/06/17.
 */

@Injectable()
export class PositionGetterService {
  constructor(private geolocation: Geolocation, private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy){}

   returnPosition(): Place {
    let place: Place = null;
    this.diagnostic.isLocationEnabled()
      .then((isEnabled) => {
        if(isEnabled){
          console.log('location enabled');
          place = this.getPosition();
        } else{
          console.log('location not enabled');
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_LOW_POWER).then(
                () => {
                  console.log('Location permission granted');
                  place = this.getPosition();
                })
                .catch(error => console.log('Error requesting location permissions', error));
            } else {
              console.log("Unable to request location");
            }
          });
        }
      }).catch(err => console.log(err));
    return place;
  }

  private getPosition(): Place {
    let place: Place = null;
    let options = {
      enableHighAccuracy: false,
      timeout: 3000
    };
    console.log(options);
    this.geolocation.getCurrentPosition(options)
      .then((resp) => {
        console.log(resp);
        place = new Place(resp.coords.longitude, resp.coords.latitude, 'You are here');

        console.log("Latitude : " , place.latitude);
        console.log("Longitude : " , place.longitude);
        //this.loadMap();
      })
      .catch(error => console.log("Error getting location", error));
    return place;
  }
}
