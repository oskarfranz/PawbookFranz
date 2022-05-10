import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  save(token: string, email: string){
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
  }

  googleSave(token: string, email: string){
    localStorage.setItem('google-token', token);
    localStorage.setItem('userEmail', email);
  }

  get(): string{
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')) return true;
    else if(localStorage.getItem('google-token')) return true;
    else return false;
  }

  remove(): void{
    console.log("pass");
    localStorage.removeItem('token');
    localStorage.removeItem('google-token');
    
    localStorage.removeItem('userEmail');//cerramos sesion
  }
}
