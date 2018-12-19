import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static fullname = 'Шевцова Мария Валерьевна';
  static phone = '+79193977777';
  static site = 'www.mary.ru';
  static mail = 'mary@tochka.com';
  title = 'BankAPP';
}
