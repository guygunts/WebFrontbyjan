import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient ) { }


    async login(data) {
      
         
         const datajson =await this.http.post(`/loginmenu`,data , {headers: {'Content-type': 'application/json'} }).toPromise()
        return datajson
    }

    async register(data) {
      
         
        const datajson =await this.http.post(`/register`,data , {headers: {'Content-type': 'application/json'} }).toPromise()
       return datajson
   }
}