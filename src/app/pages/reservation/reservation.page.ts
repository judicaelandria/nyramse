import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  map: Map;
  propertyList = [];
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.map = new Map('map').setView([-18.848475, 47.480187], 16);

    tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a><a href="//openstreetmap.mg">OSM Madagascar</a>'
    }).addTo(this.map);

    fetch('./assets/data/data.json').then(res => res.json())
    .then(json => {
      this.propertyList = json.properties;
      this.leafletMap();
    });
  }

  leafletMap() {
    for (const property of this.propertyList) {
      marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
