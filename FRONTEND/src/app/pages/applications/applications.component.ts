import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/shared/services/pet.service';
import { Router } from '@angular/router';
import { Pet } from 'src/app/shared/interfaces/pet';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private router: Router, private petService: PetService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.petService.getPets().subscribe(response =>{
      console.log(response);
      this.pets = response;
    });
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
  edit(){
    // this.userService.getUserById('6269c14a276d3b0d8416b472').subscribe(response =>{
    //   console.log(response);
    // })
  }
}
