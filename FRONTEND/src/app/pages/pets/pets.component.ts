import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  razaSelected: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  moreInfo(){
    this.router.navigate(['/pet']);
  }


}
