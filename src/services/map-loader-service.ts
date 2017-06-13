import {Injectable} from "@angular/core";
import {Place} from "../models/place";
/**
 * Created by analbessar on 13/06/17.
 */

@Injectable()
export class MapLoaderService {

  loadMap(element: HTMLElement, places: Array<Place>, myplace: Place){
    let position = new google.maps.LatLng(myplace.latitude, myplace.longitude);

    //google.maps.isAvailable().then(() => {
    let map = new google.maps.Map(element, {
      center: position,
      zoom: 15
    });


    let marker = new google.maps.Marker({
      position: position,
      map: map,
      title: myplace.title
    });

    for (let place of places){

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(place.latitude, place.longitude),
        map: map,
        title: place.title
      });

      google.maps.event.addListener(marker, 'click', function (e) {
        console.log(e);
      });

      /*map.addMarker(markerOptions)
       .then((marker: Marker) => {
       marker.showInfoWindow();
       marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
       .subscribe((e) => {
       this.selectedPlace.title = e.getTitle();
       this.selectedPlace.latitude = e.get('position').lat;
       this.selectedPlace.longitude = e.get('position').lng;
       });
       });*/
    }
    return map;
  }
}
