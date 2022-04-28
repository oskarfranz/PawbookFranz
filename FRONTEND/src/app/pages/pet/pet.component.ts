import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/shared/services/pet.service';
import { Pet } from '../../shared/interfaces/pet';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  private petService;
  pet: Pet[] = [];
  idPet: any = localStorage.getItem('idPet');

  constructor(private router: Router, petService: PetService) {
    this.petService = petService;
  }

  ngOnInit(): void {
    this.petService.getPetById(this.idPet).subscribe(response => {
      console.log('Response: ', response);
      this.pet = response;
      console.log(this.pet[0].name);
    })
  }

  send(){
    console.log("click");
    let userEmail = 'sofiarceo@gmail.com';
  }

}
