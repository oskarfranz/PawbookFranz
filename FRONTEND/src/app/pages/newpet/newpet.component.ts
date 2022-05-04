import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as socketIo from 'socket.io-client';
import { RegisterService } from 'src/app/shared/services/register.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PetService } from 'src/app/shared/services/pet.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-newpet',
  templateUrl: './newpet.component.html',
  styleUrls: ['./newpet.component.scss']
})
export class NewpetComponent implements OnInit {

  newPetForm: FormGroup;
  socketClient: any  = null;
  pets: any = [];
  succesfullyAdd: boolean = false;
  role: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private userService: UserService, private petService: PetService) { 
    this.newPetForm = formBuilder.group({
      'name': ['', Validators.required],
      'age' : ['', Validators.required],
      'raza' : ['', Validators.required],
      'size' : ['', Validators.required], //si quereos mas de una valid van entre []
      'location' : ['', Validators.required],
      'rescuedDate': ['', Validators.required],
      'image': ['', Validators.required],
      'specie': ['', Validators.required]
    })
  }

  sendData(){
    console.log(this.newPetForm);
    this.petService.getPets().subscribe(response => {
      this.pets = response;
      console.log(this.pets)
    });

    this.petService.createPet(this.newPetForm.value).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.socketUrl);
    this.petService.getPets().subscribe(response => {
      this.pets = response;
    })
  }

}
