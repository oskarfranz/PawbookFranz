import { Component, OnInit } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/shared/services/google-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: boolean = (localStorage.getItem('role') === '0')? true : (localStorage.getItem('role') === '1')? true : false;

  constructor(private router: Router, private readonly googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleAuth.getProfile();
    console.log(localStorage.length)
    if(localStorage.getItem('reload')  === 'true'){
      localStorage.setItem('reload', 'false');
      window.location.reload();
    }
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
