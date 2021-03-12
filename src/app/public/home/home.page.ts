import {Component} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  user: string;

  constructor() {

  }

  ionViewWillEnter() {
    if (localStorage.getItem('user') !== this.user) {
      this.user = localStorage.getItem('user');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.ionViewWillEnter();
  }
}
