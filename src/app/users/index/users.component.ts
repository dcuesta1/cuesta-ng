import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/User';

@Component({
  selector: '.userscomponent',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private api :HttpClient) { }

  ngOnInit() {
    this.api.get('/users').subscribe(
      (users: User[]) => {
        for(let user of users) {
          user = new User(user);
          this.users.push(user);
        }
      }
    );
  }

}
