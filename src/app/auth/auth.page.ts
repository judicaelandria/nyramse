import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(public loadingController: LoadingController, public toastController: ToastController,private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.presentLoading();
    setTimeout(() => {
      this.router.navigateByUrl('acc/reservation');
      this.presentToastWithOptions();
    }, 1000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000
    });
    await loading.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      animated: true,
      color: 'tertiary',
      duration: 1000,
      header: 'Vous êtes connecté',
      keyboardClose: true,
      mode: 'ios',
      position: 'bottom'
    });
    toast.present();
  }

}
