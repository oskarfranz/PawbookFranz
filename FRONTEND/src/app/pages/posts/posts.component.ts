import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //me permite leer valores de la url activa
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  users: User[] = [];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private dialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    let admin = localStorage.getItem('role') == '0' ? true: false;
    if(!admin){
      this.router.navigate(['/home']);
    }
    this.userService.getUsers().subscribe(response =>{
      this.users = response;
      console.log(this.users);
    });
  }

  edit(idParam: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = idParam; //pasamos el id del usuario
    this.dialog.open(ModalEditComponent, dialogConfig);
  }


}
