import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
    selector: 'app-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
    fullname = AppComponent.fullname;
    phone = AppComponent.phone;
    site = AppComponent.site;
    mail = AppComponent.mail;

    constructor() {}

    ngOnInit() {}
}
