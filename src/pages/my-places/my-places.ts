import { Component } from '@angular/core';

//import { GoogleMap } from  './providers/googlemap';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html',
 // providers: [GoogleMap]
})
export class MyPlacesPage {
	/*map: GoogleMap;

  constructor(public provider: GoogleMap) {
  	//let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
    console.log(this.map);
    /*this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
    });*/

  constructor(platform: Platform, private geolocation: Geolocation){
    platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log("Latitude : " , resp.coords.latitude);
        console.log("Longitude : " , resp.coords.longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
}
//'latLng': location,