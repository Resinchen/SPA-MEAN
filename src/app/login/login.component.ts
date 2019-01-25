import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ValidationErrors
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    done = false;
    validForm = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/pay/card-payment');
        }
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, this.loginValidator]],
            password: ['', [Validators.required]]
        });
    }

    public onFormSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
            this.authService.login(this.loginForm.value).subscribe(
                res => {
                    this.authService.setToken(res['token']);
                    this.router.navigateByUrl('/pay/client-payment');
                },
                err => {}
            );
        } else {
            this.validForm = true;
        }
    }
    private loginValidator(control: FormControl): ValidationErrors {
        const value = control.value;
        const loginValid = value
            ? value === 'admin' || Validators.email(control) === null
            : false;

        if (!loginValid) {
            return { invalidInn: 'Неверная длина ИНН' };
        }
        return null;
    }
}
