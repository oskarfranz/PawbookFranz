import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/shared/services/pet.service';
import { Pet } from '../../shared/interfaces/pet';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  razaSelected: boolean = false;
  private petService;
  pets: Pet[] = [];

  constructor(private router: Router, petService: PetService) {
    this.petService = petService;
  }

  ngOnInit(): void {
    this.petService.getPets().subscribe(response => {
      console.log('Response: ', response);
      this.pets = response;
    })
  }
  moreInfo(){
    this.router.navigate(['/pet']);
  }


}
