import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/shared/services/google-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private readonly googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleAuth.getProfile();
  }

  mascotas(){
    this.router.navigate(['/pets']);
  }
  solicitudes(){
    this.router.navigate(['/applications']);
  }
  adopcion(){
    this.router.navigate(['/newpet']);
  }


}
