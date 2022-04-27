import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  socketClient: any  = null;
  credentials: any = {};
  flagUnauthorized: boolean = false;
  flagBadLogin: boolean = false;
  token: String = "";


  constructor(private loginService: LoginService, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
     this.socketClient = socketIo.io(environment.socketUrl);
     this.socketClient.on('recieveCredentials', (data:any)=>{
       console.log('Llegaron nuevas credenciales', data);
     })
  }

  login(){
    this.flagBadLogin =false;
    this.flagUnauthorized = false;
    console.log('Login with credentials: ', this.credentials);
    this.socketClient.emit('Login with credentials: ', this.credentials);
    if(this.credentials.email=='' || this.credentials.password==''){
      //Bad request
      this.flagBadLogin = true;
      return;
    }
    this.loginService.login(this.credentials).subscribe(response =>{
      console.log(response);
      this.authService.save(response),
      this.router.navigate(['/home']);
    }, error=>{
      console.log(error.status);
      if(error.status == 401){
        //Unauthorizes status
        this.flagUnauthorized = true;
      }
    });

    //START LOGIN
    //POST to /login
    this.loginService.login(this.credentials).subscribe(response => {
      console.log('Response: ', response);
      this.token = response;
    })
  }

}
