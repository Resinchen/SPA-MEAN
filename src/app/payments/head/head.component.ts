import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
    selector: 'app-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
    userDetails;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.getUserProfile().subscribe(
            res => {
                this.userDetails = res;
            },
            err => {
                console.log(err);
            }
        );
    }
}
