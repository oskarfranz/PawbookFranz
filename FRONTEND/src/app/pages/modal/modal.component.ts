import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  applications: any  = [];

  allUsers: any = [];
  users : any = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private userService: UserService) { }

  findUser(email: any, emailToCompare: any) {
    return email ===  emailToCompare;
}

  ngOnInit(): void {
    if(this.data != undefined){

      this.userService.getUsers().subscribe(response => {
        // console.log(response)
        this.allUsers = response;
        
        let i =0;
        for(i=0;i<=this.data.length;i++){
  
          let j=0;
  
          for(j=0;j<this.allUsers.length;j++){
            if(this.allUsers[j].email === this.data[i]){
              // console.log(this.data[i] + " : " + this.allUsers[j].email);
              this.users.push(this.allUsers[j])
            }
          }
        }
        
      })
      // this.applications = this.data;
    }
    console.log(this.users);
  }

}
