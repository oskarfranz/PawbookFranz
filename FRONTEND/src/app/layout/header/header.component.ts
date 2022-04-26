import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
  }

  logout(){
    this.authService.remove(); //quitamos token
    this.router.navigate(['/login']); //redirigimos a login
  };

  home(){
    this.router.navigate(['/home']);
  }
  pets(){
    this.router.navigate(['/pets']);
  }
}
