import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/shared/services/pet.service';
import { Pet } from '../../shared/interfaces/pet';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  private petService;
  pet: Pet[] = [];
  idPet: any = localStorage.getItem('idPet');

  constructor(private router: Router, petService: PetService, private dialog: MatDialog) {
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
    let userEmail = localStorage.getItem('userEmail') || '';
    const body : string[] = [];
    body.push(userEmail);
    this.pet[0].applications.forEach(element => {
      body.push(element);
    });
    const bodyRequest = { applications: body};
    this.petService.updatePet(this.idPet, bodyRequest).subscribe(response => {
      console.log('Response: ', response);
    })
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    this.dialog.open(ModalSuccessComponent);
  }
}
