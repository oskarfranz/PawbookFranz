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

  get(): string{
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  remove(): void{
    console.log("pass");
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');//cerramos sesion
  }
}
