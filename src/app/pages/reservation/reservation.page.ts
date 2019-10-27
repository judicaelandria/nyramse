import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Map, tileLayer, marker, icon, Marker, Routing, latLng } from 'leaflet';
const iconBlueRetinaUrl = 'assets/leaflet/marker-icon-2x.fw.png';
const iconBlueUrl = 'assets/leaflet/marker-icon-2x.fw.png';
const iconYouRetinaUrl = 'assets/leaflet/pulse.gif';
const iconYouUrl = 'assets/leaflet/pulse.gif';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
import 'leaflet-routing-machine';
import { ActionSheetController } from '@ionic/angular';

const iconBlue = icon({
  iconRetinaUrl: iconBlueRetinaUrl,
  iconUrl: iconBlueUrl,
  shadowUrl,
  iconSize: [38, 50],
  iconAnchor: [22, 51],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [61, 61]
});
const iconYou = icon({
  iconRetinaUrl: iconYouRetinaUrl,
  iconUrl: iconYouUrl,
  shadowUrl,
  iconSize: [38, 50],
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
  constructor(public actionSheetController: ActionSheetController, private callNumber: CallNumber) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.map = new Map('map').setView([-18.848475, 47.480187], 13);

    tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: '',
      accessToken: 'pk.eyJ1IjoiamFyaXgiLCJhIjoiY2p5NnQ4amNoMDQ2NzNkbGNkbGhsbmIybSJ9.gPOanzVbJSJFETL1fEco0A',
      id: 'mapbox.streets',
      zoom: 18
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
    mrk = marker([-18.848334, 47.479791], iconYou).addTo(this.map)
      .bindPopup("C'est vous", 'mapContent')
      .openPopup();

    for (const eleve of this.eleves) {
      Marker.prototype.options.icon = iconBlue;
      mrk = marker([eleve.lat, eleve.long], iconBlue).addTo(this.map)
        .bindPopup(eleve.nom)
        .openPopup();

      mrk.on("click", (event) => {
        var clickedMarker = event.layer;
        this.presentActionSheet();
      });
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  myPosition() {
    this.map.setView([-18.848647, 47.480242], 18, {
      "animate": true,
      "pan": {
        "duration": 1
      }
    });
  }


  drawLine() {
    new Routing.Control({
      showAlternatives: false,
      lineOptions: { styles: [{ color: '#E77E22', weight: 7 }] },
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: true,
      waypoints: [
        latLng(-18.848475, 47.480187),
        latLng(-18.848334, 47.479791)
      ]
    }).addTo(this.map)
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Rija Nifaliana',
      buttons: [{
        text: 'Apeller',
        role: 'destructive',
        icon: 'call',
        handler: () => {
          this.dial();
        }
      }]
    });

    await actionSheet.present();
  }

  dial() {
    this.callNumber.callNumber("0340960616", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
