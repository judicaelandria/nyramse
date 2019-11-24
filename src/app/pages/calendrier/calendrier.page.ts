import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.page.html',
  styleUrls: ['./calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  }

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  viewTitle = '';

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

  constructor(private NavController:NavController,public loadingController: LoadingController,public toastController: ToastController, private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale) {
    
   }
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if(eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    }
  }
  ngOnInit() {
    this.resetEvent();
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
