import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { RequestedPayment } from '../RequestedPayment';
import { CardPayment } from '../CardPayment';

const fields: { [id: string]: string } = {
    'ИНН': 'inn',
    'БИК': 'bic',
    'номер карты': 'number',
    'за что': 'nds',
    'сколько': 'howmuch',
    'телефон': 'phone',
    'почта': 'email',
    'время карты': 'ttl',
    'cvc': 'cvc',
    'комментарий': 'comment',
    'безопасный платеж': 'notsafe',
    'корректный платеж': 'notcorrect',
    'номер счета': 'number'
};

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css'],
    providers: [HttpService]
})
export class AdminPanelComponent implements OnInit {
    cpayments: CardPayment[] = [];
    rpayments: RequestedPayment[] = [];
    showCardTable = true;

    searchField: string;
    searchFilter: string;

    constructor(private httpService: HttpService) {}

    ngOnInit() {
        this.httpService
            .getRPayments()
            .subscribe((data: RequestedPayment[]) => (this.rpayments = data));
        this.httpService
            .getCPayments()
            .subscribe((data: CardPayment[]) => (this.cpayments = data));
    }

    toggle() {
        this.showCardTable = !this.showCardTable;
    }

    updateSafe(cpayment) {
        this.httpService.updateSafePayment(cpayment._id).subscribe(
            err => {
                console.log('Error occured', err);
            },
            res => {
                console.log(res);
                cpayment.notsafe = !cpayment.notsafe;
            }
        );
    }

    updateCorrect(cpayment) {
        this.httpService.updateCorrectPayment(cpayment._id).subscribe(
            err => {
                console.log('Error occured', err);
            },
            res => {
                console.log(res);
                cpayment.notcorrect = !cpayment.notcorrect;
            }
        );
    }

    search() {
        if (this.showCardTable) {
            this.httpService
                .searchPayment(
                    true,
                    fields[this.searchField],
                    this.searchFilter
                )
                .subscribe((data: CardPayment[]) => (this.cpayments = data));
        } else {
            this.httpService
                .searchPayment(
                    false,
                    fields[this.searchField],
                    this.searchFilter
                )
                .subscribe(
                    (data: RequestedPayment[]) => (this.rpayments = data)
                );
        }
    }
}
