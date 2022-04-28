import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/shared/services/pet.service';
import { Router } from '@angular/router';
import { Pet } from 'src/app/shared/interfaces/pet';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private router: Router, private petService: PetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.petService.getPets().subscribe(response =>{
      console.log(response);
      this.pets = response;
    });
  }
  viewApplications(idPet: any, name: any){
    console.log(idPet, name);
    this.petService.getPetById(idPet).subscribe(response =>{
      console.log(response[0].applications);
    });
    // this.dialog.open(ModalComponent);
  }
}
