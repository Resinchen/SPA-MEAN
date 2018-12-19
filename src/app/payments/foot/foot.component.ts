import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-foot',
    templateUrl: './foot.component.html',
    styleUrls: ['./foot.component.css']
})
export class FootComponent implements OnInit {
    fullname = AppComponent.fullname;

    constructor() {}

    ngOnInit() {}
}
