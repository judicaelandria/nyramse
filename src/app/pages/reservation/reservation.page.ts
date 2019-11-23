import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon, Marker,Routing, latLng  } from 'leaflet';
const iconBlueRetinaUrl = 'assets/leaflet/marker-icon-2x.fw.png';
const iconBlueUrl = 'assets/leaflet/marker-icon-2x.fw.png';
const iconYouRetinaUrl = 'assets/leaflet/iconYou.fw.png';
const iconYouUrl = 'assets/leaflet/iconYou.fw.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
import 'leaflet-routing-machine';

const iconBlue = icon({
  iconRetinaUrl: iconBlueRetinaUrl,
  iconUrl: iconBlueUrl,
  shadowUrl,
  iconSize: [38,50],
  iconAnchor: [22, 51],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [61, 61]
});
const iconYou = icon({
  iconRetinaUrl: iconYouRetinaUrl,
  iconUrl: iconYouUrl,
  shadowUrl,
  iconSize: [38,50],
  iconAnchor: [22, 51],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [61, 61]
});
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  map: Map;
  eleves = [];
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.map = new Map('map').setView([-18.848475, 47.480187], 13);

    tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a><a href="//openstreetmap.mg">OSM Madagascar</a>',
      minZoom: 5,
      maxZoom: 50
    }).addTo(this.map);

    fetch('./assets/data/eleves.json').then(res => res.json())
    .then(json => {
      this.eleves = json.eleves;
      this.leafletMap();
    });
    this.drawLine();
  }

  leafletMap() {
    let mrk;
    Marker.prototype.options.icon = iconYou;
    mrk = marker([-18.848475,  47.480200], iconYou).addTo(this.map)
      .bindPopup("C'est vous", 'mapContent')
      .openPopup();
  
    for (const eleve of this.eleves) {
      Marker.prototype.options.icon = iconBlue;
      mrk = marker([eleve.lat, eleve.long], iconBlue).addTo(this.map)
        .bindPopup(eleve.nom)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  drawLine() {
    new Routing.Control({
      showAlternatives: false,
      lineOptions: {styles: [{color: '#E77E22', weight: 7}]},
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: true,
      waypoints: [
        latLng(-18.848475,  47.480187),
          latLng(-18.848475,  47.480200)
      ]
    }).addTo(this.map)
  }
}
