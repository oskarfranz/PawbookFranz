import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PetService } from 'src/app/shared/services/pet.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pet } from 'src/app/shared/interfaces/pet';

@Component({
  selector: 'app-petmodal',
  templateUrl: './petmodal.component.html',
  styleUrls: ['./petmodal.component.scss']
})
export class PetmodalComponent implements OnInit {
  petForm: FormGroup;
  idPet: String = '';
  pet: any = {
    name: '',
    age: 0,
    raza: '',
    size: '',
    sex: '',
    location: '',
    rescuedDate: '',
    image: '',
    specie: '',
    rescuer: '',
    applications: []
  };

  updatedPet: any = {
    name: '',
    age: 0,
    raza: '',
    size: '',
    sex: '',
    location: '',
    rescuedDate: '',
    image: '',
    specie: '',
    rescuer: '',
    applications: []
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,  private petService: PetService) { 
    this.petForm = formBuilder.group({
      'name': ['', Validators.required],
      'age' : ['', Validators.required],
      'raza' : ['', Validators.required],
      'size' : ['', Validators.required],
      'sex' : ['', Validators.required],
      'location' : ['', Validators.required],
      'rescuedDate': ['', Validators.required],
      'image': ['', Validators.required],
      'specie': ['', Validators.required],
      'rescuer': [''],
      'applications': [[]]
    })
    this.idPet = data;
  }

  ngOnInit(): void {
    this.petService.getPetById(this.idPet).subscribe(response =>{      
      this.pet = response;
      this.petForm.setValue({
        name: response[0].name,
        age: response[0].age,
        raza : response[0].raza,
        size : response[0].size,
        sex : response[0].sex,
        location : response[0].location,
        rescuedDate : response[0].rescuedDate,
        image : response[0].image,
        specie : response[0].specie,
        rescuer : response[0].rescuer,
        applications: []
      })
    });
  }

  sendData(){
    let body: FormGroup = this.petForm
    this.updatedPet.name = body.value.name;
    this.updatedPet.age = body.value.age;
    this.updatedPet.raza = body.value.raza;
    this.updatedPet.size = body.value.size;
    this.updatedPet.sex = body.value.sex;
    this.updatedPet.location = body.value.location;
    this.updatedPet.rescuedDate = body.value.rescuedDate;
    this.updatedPet.image = body.value.image;
    this.updatedPet.specie = body.value.specie;
    this.updatedPet.rescuer = body.value.rescuer;
    this.updatedPet.applications = body.value.applications;
    console.log(this.updatedPet);
    this.petService.updatePet(this.data, this.updatedPet).subscribe(response =>{
      console.log('Listo');
    });
  }
}
