import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { LoadingController, Loading } from 'ionic-angular';
import { Place } from '../../models/place';

@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html'
})
export class MyPlacesPage {

  places: Array<Place> = [];
  myplace: Place = new Place();
  selectedPlace: Place = new Place();
  loading: Loading;

  constructor(private geolocation: Geolocation, private googleMaps: GoogleMaps, private storage: Storage, private diagnostic: Diagnostic, private platform: Platform, private locationAccuracy: LocationAccuracy, private loadingCtrl: LoadingController){
    this.loading = loadingCtrl.create();
    this.loading.present();
    platform.ready().then(() => {
      this.checkLocationAuthorization();
    });
    storage.ready().then(() => {

      storage.forEach( (value, key, index) => {
      	this.places.push(value);
        console.log(this.places);
      });

     });
  }

  checkLocationAuthorization(){
    this.diagnostic.isLocationEnabled().then((isEnabled) => {
      if(isEnabled){
        console.log('location enabled');
        this.getPosition();
      } else{
        console.log('location not enabled');
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                console.log('Location permission granted');
                this.getPosition();
              })
              .catch(error => console.log('Error requesting location permissions', error)
            );
          }
        });
      }
    }).catch(err => console.log(err));
  }

  getPosition(){
    let options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60000
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.myplace = new Place(resp.coords.longitude, resp.coords.latitude, 'You are here');

      console.log("Latitude : " , this.myplace.latitude);
      console.log("Longitude : " , this.myplace.longitude);
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
         this.loading.dismiss();
         // Now you can add elements to the map like the marker
           // create LatLng object
           let position: LatLng = new LatLng(this.myplace.latitude, this.myplace.longitude);

           // create CameraPosition
           let camPosition: CameraPosition = {
             target: position,
             zoom: 15,
             tilt: 30
           };

           // move the map's camera to position
           map.moveCamera(camPosition);

           // create new marker
          let markerOptions: MarkerOptions = {
            position: position,
            title: this.myplace.title
          };

          for (let place of this.places){
            let markerOptions: MarkerOptions = {
              position: new LatLng(place.latitude, place.longitude),
              title: place.title,
            }
            map.addMarker(markerOptions)
              .then((marker: Marker) => {
                 marker.showInfoWindow();
                 marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe((e) => {
                      this.selectedPlace.title = e.getTitle();
                      this.selectedPlace.latitude = e.get('position').lat;
                      this.selectedPlace.longitude = e.get('position').lng;
                    });
               });
          }

          map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
          });
       }
     );
   }

  addPlace() {
    console.log(this.myplace);
    this.places.push(this.myplace);
    this.storage.ready().then(() => {
      this.storage.length().then((l) => {
        // set a key/value
        this.storage.set(l.toString(), this.myplace);
      });
     });

  }

 }
