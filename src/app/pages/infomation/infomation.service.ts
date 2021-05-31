import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Product } from './product';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class InformationService {


    constructor(private http: HttpClient ) { }

    getProductsSmall() {
        return this.http.get<any>('informationgetView')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    getProducts() {
        return this.http.get<any>('/informationgetView')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { 
            for(let i=0; i<data.length; i++){
                if(data[i].INFORMATION_TYPE == '1'){
                    data[i].INFORMATION_TYPE='ธรรมชาติและอุทยาน'
                }else if(data[i].INFORMATION_TYPE == '2'){
                    data[i].INFORMATION_TYPE='สถานที่สำคัญ'
                }else if(data[i].INFORMATION_TYPE == '3'){
                    data[i].INFORMATION_TYPE='ตลาด'
                }
            }
            return data; });
    }
   async insertinformation(data){
    return axios.post(`/informationgetinsert`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
        }

        async updateinformation(data){
            return axios.post(`/informationgetupdate`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then(res => {
                        return res.data
                    })
                    .catch(err => {
                        return err
                    })
                }  
                
                async deleteinformation(data){
                    return this.http.post<any>('informationgetdelete',data)
                    .toPromise()
                    .then(data => { return data; });
                        }         
}   