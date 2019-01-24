import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestedPayment } from './RequestedPayment';
import { ClientPayment } from './ClientPayment';
import { CardPayment } from './CardPayment';

const api_uri = 'http://localhost:3012';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}

    getRPayments() {
        return this.http.get(api_uri + '/requested-payment');
    }

    postRPayments(user: RequestedPayment) {
        return this.http.post(api_uri + '/requested-payment', user);
    }

    postClPayments(user: ClientPayment) {
        return this.http.post(api_uri + '/client-payment', user);
    }

    postCardPayments(user: CardPayment) {
        return this.http.post(api_uri + '/card-payment', user);
    }

    getCPayments() {
        return this.http.get(api_uri + '/card-payment');
    }

    updateSafePayment(id: string) {
        return this.http.patch(api_uri + '/card-payment', {
            _id: id,
            field: 'notsafe'
        });
    }

    updateCorrectPayment(id: string) {
        return this.http.patch(api_uri + '/card-payment', {
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
                api_uri + `/card-payment?field=${field}&filter=${filter}`
            );
        } else {
            return this.http.get(
                api_uri + `/requested-payment?field=${field}&filter=${filter}`
            );
        }
    }
}
