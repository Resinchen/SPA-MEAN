import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

    constructor(private http: HttpClient) {}

    login(authValue) {
        return this.http.post('http://localhost:3012/login', authValue, this.noAuthHeader);
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserProfile() {
        const _id = this.getUserPayload()._id;
        return this.http.get(`http://localhost:3012/userProfile?_id=${_id}`);
    }

    getUserPayload() {
        const token = this.getToken();
        if (token) {
            const userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn() {
        const userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        }
    }
}
