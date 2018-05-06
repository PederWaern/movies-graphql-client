import { Component, OnInit } from '@angular/core';
import {Subscription} from "apollo-client/util/Observable";
import {User} from "../models/models";
import {ConfigService} from "../config.service";
import {GET_ALL_USERS} from "../graphql";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private querySubscription: Subscription;
  users: User[];
  currentUser: User;
  constructor(private configService: ConfigService, private apollo: Apollo) { }

  ngOnInit() {
    this.configService.createApollo();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ALL_USERS
    })
      .valueChanges
      .subscribe(({data}) => {
        this.users = data.allUsers;
        this.currentUser = this.users[0];
        console.log(this.users);
      });
  }

  setUser(user: User) {
    console.log('set user calld');
    this.currentUser = user;
  }

}
