import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-foot',
    templateUrl: './foot.component.html',
    styleUrls: ['./foot.component.css']
})
export class FootComponent implements OnInit {
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
