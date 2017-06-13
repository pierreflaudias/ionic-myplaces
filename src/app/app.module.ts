import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MyPlacesPage } from '../pages/my-places/my-places';
import { PlaceDetailsPage } from '../pages/place-details/place-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import {StorageService} from "../services/storage-service";
import {PositionGetterService} from "../services/position-getter-service";
import {DistanceCalculatorService} from "../services/distance-calculator-service";
import {MapLoaderService} from "../services/map-loader-service";



@NgModule({
  declarations: [
    MyApp,
    MyPlacesPage,
    PlaceDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    MyPlacesPage,
    PlaceDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    Diagnostic,
    LocationAccuracy,
    StorageService,
    DistanceCalculatorService,
    MapLoaderService,
    PositionGetterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
