import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isLogged: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.isLoggedIn()
  }

  
  isLoggedIn(){
    // while(true){
     this.isLogged = this.authService.isLoggedIn();
    // }
  }

  logout(){
    this.authService.remove(); //quitamos token
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
