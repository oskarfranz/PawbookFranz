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
  getPetById(idPet: any): Observable<any>{
    const url = environment.socketUrl+'/api/pets/'+idPet;
    return this.httpClient.get(url); //pet with Id
  }
  updatePet(idPet: any, body: any): Observable<any>{
    const url = environment.socketUrl+'/api/pets/'+idPet;
    return this.httpClient.put(url, body, { responseType: 'text' }); //update pet with Id
  }
}
