import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { traffic } from './traffic';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class trafficService {


    constructor(private http: HttpClient) { }


    gettraffic() {
        return this.http.get<any>('/trafficgetView')
            .toPromise()
            .then(res => <traffic[]>res.data)
            .then(data => {
                return data;
            });
    }
    async inserttraffic(data) {
        return axios.post(`/trafficgetinsert`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatetraffic(data) {
        return axios.post(`/trafficgetupdate`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletetraffic(data) {
        return this.http.post<any>('trafficgetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}