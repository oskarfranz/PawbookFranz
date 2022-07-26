import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router"
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  login(credentials: any): Observable<any>{
    var post_headers = new HttpHeaders();
    post_headers.append('Access-Control-Allow-Origin', '*');
    const url = environment.socketUrl+'/api/login';
    // return this.httpClient.post("http://localhost:3000/login", credentials, {
    //   headers: post_headers
    // });
    return this.httpClient.post("https://pawbook-app.herokuapp.com/api/login", credentials,{ responseType: 'text' }); //mandamos usuario a la api para que verifique credenciales
  }
}
