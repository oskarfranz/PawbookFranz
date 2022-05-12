import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GoogleAuthService } from 'src/app/shared/services/google-auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isLogged: boolean = false;
  role: boolean = (localStorage.getItem('role') === '0')? true : (localStorage.getItem('role') === '1')? false : false;
  
  constructor(private authService: AuthService, private router: Router, private readonly googleAuth: GoogleAuthService) {
  }
  
  ngOnInit(): void {
    this.isLoggedIn()
  }

  
  isLoggedIn(){
    this.isLogged = this.authService.isLoggedIn();
    // while(true){
    // }
  }

  logout(){
    this.authService.remove(); //quitamos token
    this.googleAuth.signOut();
    // window.location.reload();
    this.router.navigate(['/login']); //redirigimos a login
    this.ngOnInit();
  };

  home(){
    this.router.navigate(['/home']).then(() => {
      // window.location.reload();
    });
  }
  pets(){
    this.router.navigate(['/pets']);
  }
  post(){
    this.router.navigate(['/posts']);
  }
}
