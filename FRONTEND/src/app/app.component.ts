import { Component } from '@angular/core';
// import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }

  ngOnInit() : void{
    // socketIo.io(environment.socketUrl);
  };
}
