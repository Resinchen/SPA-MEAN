import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestedPayment } from './RequestedPayment';
import { ClientPayment } from './ClientPayment';
import { CardPayment } from './CardPayment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}

    getRPayments() {
        return this.http.get('http://localhost:3012/requested-payment');
    }

    postRPayments(user: RequestedPayment) {
        return this.http.post('http://localhost:3012/requested-payment', user);
    }

    postClPayments(user: ClientPayment) {
        return this.http.post('http://localhost:3012/client-payment', user);
    }

    postCardPayments(user: CardPayment) {
        return this.http.post('http://localhost:3012/card-payment', user);
    }

    getCPayments() {
        return this.http.get('http://localhost:3012/card-payment');
    }

    updateSafePayment(id: string) {
        return this.http.patch('http://localhost:3012/card-payment', {
            _id: id,
            field: 'notsafe'
        });
    }

    updateCorrectPayment(id: string) {
        return this.http.patch('http://localhost:3012/card-payment', {
            _id: id,
            field: 'notcorrect'
        });
    }

    searchPayment(isCardTable: boolean, field: string, filter: string) {
        if (field === undefined || filter === undefined) {
            return;
        }

        if (field === '' || filter === '') {
            if (isCardTable) {
                return this.getCPayments();
            } else {
                return this.getRPayments();
            }
        }
        if (isCardTable) {
            return this.http.get(
                `http://localhost:3012/card-payment?field=${field}&filter=${filter}`
            );
        } else {
            return this.http.get(
                `http://localhost:3012/requested-payment?field=${field}&filter=${filter}`
            );
        }
    }
}
