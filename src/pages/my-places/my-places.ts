import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LoadingController, Loading } from 'ionic-angular';
import { Place } from '../../models/place';
import {StorageService} from "../../services/storage-service";
import {MapLoaderService} from "../../services/map-loader-service";
import {DistanceCalculatorService} from "../../services/distance-calculator-service";
import {PositionGetterService} from "../../services/position-getter-service";
declare var google;

@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html'
})
export class MyPlacesPage {

  places: Array<Place> = [];
  myplace: Place = new Place();
  selectedPlace: Place = new Place();
  loading: Loading;

  constructor(private storage: StorageService, private mapLoader: MapLoaderService, private distanceCalculator: DistanceCalculatorService, private positionGetter: PositionGetterService, private geolocation: Geolocation, private diagnostic: Diagnostic, private platform: Platform, private locationAccuracy: LocationAccuracy, private loadingCtrl: LoadingController){
    this.loading = loadingCtrl.create();
    this.loading.present();
    platform.ready()
      .then(() => this.checkLocationAuthorization())
      .then(() => {
        this.storage.getPlaces(this.places);
     });
  }

  checkLocationAuthorization(){
    this.diagnostic.isLocationEnabled()
      .then((isEnabled) => {
        if(isEnabled){
          console.log('location enabled');
          this.getPosition();
        } else{
          console.log('location not enabled');
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_LOW_POWER).then(
                () => {
                  console.log('Location permission granted');
                  this.getPosition();
                })
                .catch(error => console.log('Error requesting location permissions', error)
              );
            } else {
              console.log("Unable to request location");
            }
          });
        }
    }).catch(err => console.log(err));
  }

  getPosition(){
    this.myplace = this.positionGetter.returnPosition();
    let options = {
      enableHighAccuracy: false,
      timeout: 3000
    };

    this.loadMap();

    const subscription = this.geolocation.watchPosition(options)
    //.filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        console.log(position);
        console.log('Distance entre les points ', this.distanceCalculator.calculateDistance(this.myplace.latitude, this.myplace.longitude, 45.7623217, 3.1089166));
        if(position.coords != null) {
          this.myplace.latitude = position.coords.latitude;
          this.myplace.longitude = position.coords.longitude;
        }
          console.log("Latitude : ", this.myplace.latitude);
          console.log("Longitude : ", this.myplace.longitude);

      });
  }

  loadMap() {
     // make sure to create following structure in your view.html file
     // and add a height (for example 100%) to it, else the map won't be visible
     // <ion-content>
     //  <div #map id="map" style="height:100%;"></div>
     // </ion-content>

     // create a new map by passing HTMLElement
    let map = this.mapLoader.loadMap(document.getElementById('map'), this.places, this.myplace);

    this.loading.dismiss();

       /*google.maps.addEventListener(map, 'idle', function () {
         console.log('Map is ready!');
         this.loading.dismiss();
       });*/
     //});

    /*this.googleMaps.isAvailable().then(() => {
      let map: GoogleMap = this.googleMaps.create(element);

       console.log(map);

       // listen to MAP_READY event
       // You must wait for this event to fire before adding something to the map or modifying it in anyway
      map.one(GoogleMapsEvent.MAP_READY)
         .then(() => {
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
             map.moveCamera(camPosition).then((resp) => {
               console.log(resp);
             }).catch((err) => {
               console.log(err);
             });

             // create new marker
            let markerOptions: MarkerOptions = {
              position: position,
              title: this.myplace.title
            };

            for (let place of this.places){
              let markerOptions: MarkerOptions = {
                position: new LatLng(place.latitude, place.longitude),
                title: place.title,
              };

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
    });*/
  }

  addPlace() {
    console.log(this.myplace);
    this.places.push(this.myplace);
    this.storage.addPlace(this.myplace);
  }
 }
