/**
 * Created by analbessar on 13/06/17.
 */


export class DistanceCalculatorService {

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Translate to a distance
    let  R = 6370981.162; // Radius of the earth in m
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in m
    return d;
  }


  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
