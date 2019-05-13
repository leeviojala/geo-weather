import { Component, OnInit, AfterContentInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../models/weather';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.sass']
})
export class WeatherViewComponent implements OnInit {
  private weatherCity: Observable<string>;
  private weatherTemp: Observable<string>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getLocation();
    this.weatherCity = this.weatherService.weatherBsub.pipe(map((weather: Weather) => weather.city), distinctUntilChanged());
    this.weatherTemp = this.weatherService.weatherBsub.pipe(map((weather: Weather) => weather.temp), distinctUntilChanged());


  }


}
