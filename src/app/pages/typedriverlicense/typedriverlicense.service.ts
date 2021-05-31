import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { typedriverlicense } from './typedriverlicense';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class typedriverlicenseService {


    constructor(private http: HttpClient) { }

    gettypedriverlicense() {
        return this.http.get<any>('/typedriverlicensegetView')
            .toPromise()
            .then(res => <typedriverlicense[]>res.data)
            .then(data => {
                return data;
            });
    }
    async inserttypedriverlicense(data) {
        return axios.post(`/typedriverlicensegetinsert`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatetypedriverlicense(data) {
        return axios.post(`/typedriverlicensegetupdate`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletetypedriverlicense(data) {
        return this.http.post<any>('typedriverlicensegetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}