import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { 

  }

  getUsers(): Observable<any>{
    const url = environment.socketUrl+'/api/users';
    return this.httpClient.get(url); //obtenemos usuarios haciendo get a la api
  }
}
