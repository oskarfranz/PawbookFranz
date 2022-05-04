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
    this.authService.isLoggedIn()? this.isLogged = true: this.isLogged = false;
  }


  logout(){
    this.authService.remove(); //quitamos token
    this.router.navigate(['/login']); //redirigimos a login
  };

  home(){
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
  pets(){
    this.router.navigate(['/pets']);
  }
  post(){
    this.router.navigate(['/posts']);
  }
}
