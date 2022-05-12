import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/shared/services/pet.service';
import { Router } from '@angular/router';
import { Pet } from 'src/app/shared/interfaces/pet';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PetmodalComponent } from '../petmodal/petmodal.component';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  pets: Pet[] = [];
  visiblePets: Pet[] = [];
  role: boolean = (localStorage.getItem('role') === '0')? true : false;


  constructor(private router: Router, private petService: PetService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.petService.getPets().subscribe(response =>{
      console.log(response);
      this.pets = response;
      this.visiblePets = this.updateVisiblePets(this.pets);
    });
  }

  updateVisiblePets(allPets: Pet[]){
    let visblePets: Pet[] = [];
    let rol = this.role
    this.pets.forEach(function(pet, index, array) {
      if(!rol){
        if(localStorage.getItem('userEmail') === pet.rescuer){
          // console.log(pet);
          visblePets.push(pet);
        }
      } else {
        visblePets = allPets;
      }
    });
    return visblePets;
  }

  viewApplications(idPet: any, name: any){
    console.log(idPet, name);
    this.petService.getPetById(idPet).subscribe(response =>{
      var applications = response[0].applications;
      console.log(applications);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = applications; //pasamos las solicitudes
      this.dialog.open(ModalComponent, dialogConfig);
    });
  }
  edit(idPet: any){
    console.log(idPet);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = idPet;
    this.dialog.open(PetmodalComponent, dialogConfig);
  }
}
