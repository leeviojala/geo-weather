import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from './models/weather';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private lat: string;
  private lon: string;
  private tempNumber: number;
  private tempString: string;
  private weather: Weather;
  private asd: BehaviorSubject<Weather> = new BehaviorSubject(new Weather());
  public readonly weatherBsub: Observable<Weather> = this.asd.asObservable();

  constructor(private http: HttpClient) { }

  public getWeather() {
    // tslint:disable-next-line:max-line-length
    console.log('lulwatä');
    // tslint:disable-next-line:max-line-length
    this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&appid=453382cec788339c262b0ffbf0ec4ff0')
        .subscribe( (weatherData: any) => {
          this.tempNumber = parseFloat(weatherData.main.temp);
          console.log(this.tempNumber);
          this.tempString = (this.tempNumber - 273.15).toString();
          const weatherCity: string = weatherData.name;

          this.weather = {
            city : weatherCity,
            temp: this.tempString
          };
          console.log(this.weather);
          this.asd.next(this.weather);
        });
  }

  public getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude.toString(); // .split('.')[0];
      this.lon = position.coords.longitude.toString(); // .split('.')[0];
      console.log('asd');
      this.getWeather();
    });
  }
}
