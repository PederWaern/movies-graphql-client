import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigModel} from './models/models';
import {Subscription} from 'apollo-client/util/Observable';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
