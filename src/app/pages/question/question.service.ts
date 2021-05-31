import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { question } from './question';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class questionService {


    constructor(private http: HttpClient) { }

    getquestion() {
        return this.http.get<any>('/questiongetView')
            .toPromise()
            .then(res => <question[]>res.data)
            .then(data => {
                return data;
            });
    }
    async insertquestion(data) {
        return axios.post(`/questiongetinsert`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updatequestion(data) {
        return axios.post(`/questiongetupdate`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deletequestion(data) {
        return this.http.post<any>('questiongetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}