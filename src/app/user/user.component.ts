import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "apollo-client/util/Observable";
import {User} from "../models/models";
import {ConfigService} from "../config.service";
import {GET_ALL_USERS} from "../graphql";
import {Apollo} from "apollo-angular";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private querySubscription: Subscription;
  private currentUserSub: Subscription;
  users: User[];
  currentUser: User;
  constructor(private configService: ConfigService, private apollo: Apollo, private userService: UserService) { }

  ngOnInit() {
    this.configService.createApollo();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ALL_USERS
    })
      .valueChanges
      .subscribe(({data}) => {
        this.users = data.allUsers;
        const firstUser = this.users[0];
        this.userService.setCurrentUser(firstUser);
        this.currentUserSub = this.userService.currentUser.subscribe((user) => {
          console.log('see this??');
          this.currentUser = user;
        });
      });

  }

  setUser(user: User) {
    this.currentUser = user;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

}
