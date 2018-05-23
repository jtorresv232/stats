import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [UserService]
})
export class ToolbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }

}
