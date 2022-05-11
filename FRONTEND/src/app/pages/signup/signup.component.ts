import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as socketIo from 'socket.io-client';
import { RegisterService } from 'src/app/shared/services/register.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  socketClient: any  = null;
  users: any = [];
  invalidEmail: boolean = false;
  succesfullyAdd: boolean = false;
  role: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private userService: UserService, private authService: AuthService, private router: Router) { 
    this.form = formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'username' : ['', Validators.required],
      'age' : ['', Validators.required],
      'cellphone' : ['', Validators.required],
      'email' : ['', [Validators.required, Validators.email]], //si quereos mas de una valid van entre []
      'password' : ['', [Validators.required, Validators.minLength(8)]],
      'confirm': ['', [Validators.required, Validators.minLength(8)]],
      'role': ['', Validators.required],
      'ocupation': [''],
      'organization': [''],
      'location': ['']

    },{
      validators: this.matchPassword.bind(this) //necesitamos pasarle el mismo contexto
    })
  }

  sendData(){
    console.log(this.form);
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
    if(this.users.find((user: any) => user.email === this.form.value.email)){
      console.log('Sorry email already taken'); //si el email ya esta dado de alta
      this.invalidEmail= true;
    }
    else if(this.form.valid){
      this.invalidEmail= false;
      console.log('Enviar datos');
      console.log('signin up user...');
      console.log(this.form);

      if(this.form.value.role === "adoptador"){
        this.form.value.role = -1;
      }else {     //rescatista
        this.form.value.role = 1;
      }

      this.registerService.registerUser(this.form.value).subscribe(response => {
        console.log(response);
        this.succesfullyAdd= true;
      });
    }else{
      console.log('Error, faltan datos');
    }
  }

  matchPassword(){
    if(!this.form) return;
    const { password, confirm} = this.form.getRawValue();
    if(password == confirm){
      return null; //no hay error
    }else{
      return { passwordMisMatch: true} //retornamos el error
    }
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
    this.socketClient = socketIo.io(environment.socketUrl);
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

}
