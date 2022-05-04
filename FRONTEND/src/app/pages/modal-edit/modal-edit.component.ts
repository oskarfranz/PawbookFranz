import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    'Name':  new FormControl('', Validators.required),
    'LastName': new FormControl('', Validators.required),
    'username': new FormControl('', Validators.required),
    'age': new FormControl('', Validators.required),
    'cellPhone': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required)
  })
  user: User = {
    name: '',
    lastname: '',
    age: 0,
    email: '',
    username: '',
    cellphone: '', 
    role: 0
  };

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUserById(this.data).subscribe(response =>{
      this.form.setValue({
        Name: [response[0].name],
        LastName: [response[0].lastname],
        username : [response[0].username],
        age : [response[0].age],
        cellPhone : [response[0].cellphone],
        email : [response[0].email]
      })
    })
  }

  edit(){
    this.user.name = typeof(this.form.value.Name) == 'string' ?  this.form.value.Name : this.form.value.Name[0];
    this.user.lastname = typeof(this.form.value.LastName) == 'string' ?  this.form.value.LastName: this.form.value.LastName[0];
    this.user.age = typeof(this.form.value.age) == 'string' ? this.form.value.age : this.form.value.age[0];
    this.user.cellphone = typeof(this.form.value.cellPhone) == 'string' ? this.form.value.cellPhone : this.form.value.cellPhone[0];
    this.user.email = typeof(this.form.value.email) == 'string' ? this.form.value.email : this.form.value.email[0];
    this.user.username = typeof(this.form.value.username) == 'string' ? this.form.value.username : this.form.value.username[0];
    this.userService.updateUserById(this.data, this.user).subscribe(response =>{
      console.log(response);
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ModalSuccessComponent, dialogConfig);
  }

}
