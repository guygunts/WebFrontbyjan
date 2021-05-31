import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { basicdriver } from './basicdriver';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class BasicdriverService {


    constructor(private http: HttpClient) { }

    getbasicdriverSmall() {
        return this.http.get<any>('/basicdrivergetView')
            .toPromise()
            .then(res => <basicdriver[]>res.data)
            .then(data => { return data; });
    }

    getbasicdriver() {
        return this.http.get<any>('/basicdrivergetView')
            .toPromise()
            .then(res => <basicdriver[]>res.data)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type_car == 1) {
                        data[i] = { ...data[i], ...{ type_car_name: 'car' } };
                    } else if (data[i].type_car == 2) {
                        data[i] = { ...data[i], ...{ type_car_name: 'motorcycle' } };
                    }
                }
                return data;
            });
    }
    async insertbasicdriver(data) {
        return axios.post(`/basicdrivergetinsert`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatebasicdriver(data) {
        return axios.post(`/basicdrivergetupdate`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletebasicdriver(data) {
        return this.http.post<any>('basicdrivergetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}