import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getPets(): Observable<any>{
    const url = environment.socketUrl+'/api/pets';
    return this.httpClient.get(url); //get pets
  }
}
