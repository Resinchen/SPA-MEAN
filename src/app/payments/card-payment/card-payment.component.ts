import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { CardPayment } from 'src/app/CardPayment';

@Component({
    selector: 'app-card-payment',
    templateUrl: './card-payment.component.html',
    styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
    private cardPayment: CardPayment;
    cardForm: FormGroup;
    done = false;

    constructor(private fb: FormBuilder, private http: HttpService) {}

    ngOnInit() {
        this.cardForm = this.fb.group({
            number: [
                '',
                [
                    Validators.required,
                    Validators.minLength(16),
                    Validators.maxLength(16)
                ]
            ],
            ttl: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/(1[012]|0?[1-9])\/(\d{2})/)
                ]
            ],
            cvc: ['', [Validators.required, Validators.maxLength(3)]],
            howmuch: [
                '',
                [
                    Validators.required,
                    Validators.min(1000),
                    Validators.max(75000)
                ]
            ],
            comment: ['', [Validators.maxLength(150)]],
            email: ['', [Validators.required]]
        });
    }

    public onFormSubmit() {
        if (this.cardForm.valid) {
            this.cardPayment = this.cardForm.value;
            console.log(this.cardPayment);

            this.http.postCardPayments(this.cardPayment).subscribe(
                (data: CardPayment) => {
                    this.cardPayment = data;
                    this.done = true;
                },
                error => console.log(error)
            );
        }
    }
}
