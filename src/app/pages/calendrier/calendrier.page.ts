import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.page.html',
  styleUrls: ['./calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {
  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  constructor(private NavController:NavController, public toastController: ToastController, public loadingController: LoadingController) {
    
   }
   onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  ngOnInit() {
  }

  logout(){
    this.presentLoading();
    setTimeout(() => {
      this.NavController.navigateRoot('login');
      this.presentToastWithOptions();
    }, 1000);
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      animated: true,
      color: 'tertiary',
      duration: 2000,
      header: 'Vous êtes déconnecté',
      mode: 'ios',
      position: 'bottom'
    });
    toast.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }


}
