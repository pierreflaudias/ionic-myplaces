import { Component } from '@angular/core';

//import { GoogleMap } from  './providers/googlemap';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';


@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html'
})
export class MyPlacesPage {

  latitude: any;
  longitude: any;
  constructor(private geolocation: Geolocation, private googleMaps: GoogleMaps){}

  ngOnInit() {
      let options = {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 60000
        };
    this.geolocation.getCurrentPosition(options).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      console.log("Latitude : " , this.latitude);
      console.log("Longitude : " , this.longitude);
      this.loadMap();
    })
    .catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap() {
     // make sure to create following structure in your view.html file
     // and add a height (for example 100%) to it, else the map won't be visible
     // <ion-content>
     //  <div #map id="map" style="height:100%;"></div>
     // </ion-content>

     // create a new map by passing HTMLElement
     let element: HTMLElement = document.getElementById('map');

     let map: GoogleMap = this.googleMaps.create(element);

     // listen to MAP_READY event
     // You must wait for this event to fire before adding something to the map or modifying it in anyway
     map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         console.log('Map is ready!');
         // Now you can add elements to the map like the marker
           // create LatLng object
           let position: LatLng = new LatLng(this.latitude, this.longitude);

           // create CameraPosition
           let camPosition: CameraPosition = {
             target: position,
             zoom: 10,
             tilt: 30
           };

           // move the map's camera to position
           map.moveCamera(camPosition);

           // create new marker
          let markerOptions: MarkerOptions = {
            position: position,
            title: 'You are here'
          };

          const marker: any = map.addMarker(markerOptions)
            .then((marker: Marker) => {
               marker.showInfoWindow();
             });
       }
     );


 }

}
