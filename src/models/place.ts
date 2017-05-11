export class Place {
  title: string;
  longitude: number;
  latitude: number;

  constructor(longitude?: number, latitude?: number, title?: string) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.title = title;
  }

}
