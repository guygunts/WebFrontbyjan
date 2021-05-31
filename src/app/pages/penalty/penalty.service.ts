import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { penaltys } from './penaltys';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class penaltysService {


    constructor(private http: HttpClient) { }

    getpenaltys() {
        return this.http.get<any>('/penaltygetView')
            .toPromise()
            .then(res => <penaltys[]>res.data)
            .then(data => {
                return data;
            });
    }
    async insertpenaltys(data) {
        return axios.post(`/penaltygetinsert`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatepenaltys(data) {
        return axios.post(`/penaltygetupdate`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletepenaltys(data) {
        return this.http.post<any>('penaltygetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}