import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { technical } from './technical';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class technicalService {


    constructor(private http: HttpClient) { }


    gettechnical() {
        return this.http.get<any>('/technicalgetView')
            .toPromise()
            .then(res => <technical[]>res.data)
            .then(data => {
                return data;
            });
    }
    async inserttechnical(data) {
        return axios.post(`/technicalgetinsert`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatetechnical(data) {
        return axios.post(`/technicalgetupdate`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletetechnical(data) {
        return this.http.post<any>('technicalgetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}