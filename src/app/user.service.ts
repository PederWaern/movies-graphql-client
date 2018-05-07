import {Injectable, OnInit} from '@angular/core';
import {User} from "./models/models";
import {ConfigService} from "./config.service";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class UserService implements OnInit {

  public currentUser: Subject<User> = new ReplaySubject(1);

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {}

  setCurrentUser(user: User) {
    console.log('from set current user');
    console.log(user);
    this.currentUser.next(user);
    console.log(this.currentUser);
  }

  getCurrentUser(): any {
  }

}
