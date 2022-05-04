import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
