import { Component, OnInit } from '@angular/core';
import { RequestedPayment } from 'src/app/RequestedPayment';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ValidationErrors
} from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-requested-payment',
    templateUrl: './requested-payment.component.html',
    styleUrls: ['./requested-payment.component.css']
})
export class RequestedPaymentComponent implements OnInit {
    private rPayment: RequestedPayment;
    reqForm: FormGroup;
    done = false;
    userDetails;

    constructor(private fb: FormBuilder, private http: HttpService, private authService: AuthService) {}

    ngOnInit() {
        this.authService.getUserProfile().subscribe(
            res => {
                this.userDetails = res;
            },
            err => {
                console.log(err);
            }
        );

        this.reqForm = this.fb.group({
            inn: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/\d{12}|\d{10}/),
                    this.innLengthValidator
                ]
            ],
            bic: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/\d{9}/),
                    Validators.minLength(9),
                    Validators.maxLength(9)
                ]
            ],
            number: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/\d{20}/),
                    Validators.minLength(20),
                    Validators.maxLength(20)
                ]
            ],
            nds: ['Без НДС', [Validators.required]],
            howmuch: [
                '',
                [
                    Validators.required,
                    Validators.min(1000),
                    Validators.max(75000)
                ]
            ],
            phone: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/\+7( \d{3}){2}(-\d{2}){2}/)
                ]
            ],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    public onFormSubmit() {
        if (this.reqForm.valid) {
            this.rPayment = this.reqForm.value;
            console.log(this.rPayment);

            this.http.postRPayments(this.rPayment).subscribe(
                (data: RequestedPayment) => {
                    this.rPayment = data;
                    this.done = true;
                },
                error => console.log(error)
            );
        }
    }

    private innLengthValidator(control: FormControl): ValidationErrors {
        const value = control.value;
        const innValid = value
            ? value.length === 10 || value.length === 12
            : false;

        if (!innValid) {
            return { invalidInn: 'Неверная длина ИНН' };
        }
        return null;
    }
}
