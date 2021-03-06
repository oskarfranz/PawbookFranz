import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isGoogleLogged (){
    if(localStorage.getItem('reload') === 'false') return true;
    else return false;
  }

  constructor() { }

  save(token: string, email: string, role: number){
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', String(role));

  }

  googleSave(token: string, email: string, role: number){
    localStorage.setItem('google-token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', String(role));
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
    console.log("Logging out...");
    localStorage.removeItem('token');
    localStorage.removeItem('google-token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');//cerramos sesion
    localStorage.removeItem('reload');
  }
}
