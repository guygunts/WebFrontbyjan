import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exam } from './exam';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class examService {


    constructor(private http: HttpClient) { }

    getexam() {
        return this.http.get<any>('/examgetView')
            .toPromise()
            .then(res => <exam[]>res.data)
            .then(data => {
                return data;
            });
    }
    async insertexam(data) {
        return axios.post(`/examgetinsert`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async updateexam(data) {
        return axios.post(`/examgetupdate`, data, { headers: {'Content-type': 'application/json'} })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async deleteexam(data) {
        return this.http.post<any>('examgetdelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}