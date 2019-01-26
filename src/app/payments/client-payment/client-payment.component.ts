import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    Validators,
    FormBuilder,
    FormControl,
    ValidationErrors
} from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { ClientPayment } from 'src/app/ClientPayment';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-client-payment',
    templateUrl: './client-payment.component.html',
    styleUrls: ['./client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit {
    private clPayment: ClientPayment;
    clientForm: FormGroup;
    done = false;

    constructor(private fb: FormBuilder, private http: HttpService) {}

    ngOnInit() {
        this.clientForm = this.fb.group({
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
            ]
        });
    }

    public onFormSubmit() {
        if (this.clientForm.valid) {
            this.clPayment = this.clientForm.value;
            console.log(this.clPayment);

            this.http.postClPayments(this.clPayment).subscribe(
                data => saveAs(data),
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
