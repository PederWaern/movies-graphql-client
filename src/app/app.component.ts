import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigModel} from './models/models';
import {Subscription} from 'apollo-client/util/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public configModel: ConfigModel;
  private querySubscription: Subscription;

  constructor() {
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
