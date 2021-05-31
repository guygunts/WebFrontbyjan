import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { property } from './property';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class propertyService {


    constructor(private http: HttpClient) { }


    getproperty() {
        return this.http.get<any>('/propertygetView')
            .toPromise()
            .then(res => <property[]>res.data)
            .then(data => {
                return data;
            });
    }
    async insertproperty(data) {
        return axios.post(`/propertygetinsert`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updateproperty(data) {
        return axios.post(`/propertygetupdate`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deleteproperty(data) {
        return this.http.post<any>('propertygetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}