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
  allPets: Pet[] = [];
  backup: Pet[] = [];
  private filters: String[] = [];
  isPetsEmpty: Boolean = false;

  constructor(private router: Router, petService: PetService) {
    this.petService = petService;
  }

  ngOnInit(): void {
    this.petService.getPets().subscribe(response => {
      console.log('Response: ', response);
      this.pets = response;
      this.allPets = this.pets;
      this.backup = this.pets;
      if(this.pets.length >= 6){
        this.pets = this.pets.slice(0,6);
      }
    })
  }
  moreInfo(idPet: any){
    this.router.navigate(['/pet']);
    localStorage.setItem('idPet', idPet);
  }

  addFilter(filter: String){
    if(this.filters.indexOf(filter) != -1){ //Si ya existía el filtro en la lista, lo removemos
      var updatedFilters: String[] = this.filters.filter(function(value, index, arr){ 
        return value != filter;
       });
      this.filters = updatedFilters;
    }
    else{                                   //Si no existía en la lista, lo añadimos
      this.filters.push(filter);
    }
    console.log("active filters: " + this.filters);
    this.updateVisiblePets(this.filters);
  }

  updateVisiblePets(filters: String[]){
    this.pets =  this.allPets; //Inicializamos sin filtros

    // Caso base
    if(filters.length == 0) return;
    var mascotas: Pet[] = this.pets;
    var updatedPets: Pet[] = [];
    filters.forEach(function(filtro, indice, arreglo) {
      mascotas.forEach(function(mascota, index, array) {
        // console.log(mascota.size + "  " + filtro);
        if(filters.length == 1){
          // console.log(filters.length)
          // console.log(filters)
          if(filtro == mascota.size){
            // console.log(mascota);
            updatedPets.push(mascota);
          } 
          else if((filtro == '0-2' && mascota.age <= 2) || 
           (filtro == '3-6' && (mascota.age <= 6 && mascota.age >= 3)) || 
           (filtro == '7-9' && (mascota.age <= 9 && mascota.age >= 7)) || 
           (filtro == '9+'  && (mascota.age >= 9))){

            // console.log(mascota);
            updatedPets.push(mascota);
          
          }
          else if((filtro ==  mascota.specie)){
            // console.log(mascota);
            updatedPets.push(mascota);
          }
        } 
        else if(filters.length == 2){
          if((filtro ==  mascota.specie)){
            console.log()
            if(filters[indice+1] == mascota.size){
              // console.log(mascota);
              updatedPets.push(mascota);
            } 
          }
        }
        else if(filters.length == 3){
          if((filtro ==  mascota.specie)){
            if(filters[indice+1] == mascota.size){
              if((filters[indice+2] == '0-2' && mascota.age <= 2) || 
                 (filtro == '3-6' && (mascota.age <= 6 && mascota.age >= 3)) || 
                 (filtro == '7-9' && (mascota.age <= 9 && mascota.age >= 7)) || 
                 (filtro == '9+'  && (mascota.age >= 9))){
                console.log("PASS")
                // console.log(mascota);
                updatedPets.push(mascota);
          }
            } 
          }
        }
      });
    });
    if(updatedPets.length>0){
      this.pets = updatedPets;
      this.backup = updatedPets;
      // this.pets = this.pets.slice(0,6);
      this.isPetsEmpty = false;
    } else {
      this.isPetsEmpty = true;
      console.log('There is no pets')
    }
  }

  onPaginateChange(event: any){ 
    let inicio = event.pageIndex == 0 ? event.pageIndex: event.pageIndex +  event.pageSize;
    let fin = event.pageIndex == 0 ?  event.pageSize : this.allPets.length;
    console.log(inicio, fin);
    console.log(this.pets);
    this.pets = this.backup;
    this.pets = this.pets.slice(inicio, fin);
  }
}
