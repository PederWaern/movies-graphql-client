import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ConfigService, GET_CONFIGURATION_QUERY} from './config.service';
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

  constructor(private apollo: Apollo, private configService: ConfigService) {
  }

  ngOnInit() {
    // this.configService.createApollo();
    // this.querySubscription = this.apollo.watchQuery<any>({
    //   query: GET_CONFIGURATION_QUERY
    // })
    //   .valueChanges
    //   .subscribe(({data}) => {
    //     this.configModel = data.config;
    //     this.configService.setConfig(this.configModel);
    //     console.log(this.configService.getConfig());
    //   });
  }

  ngOnDestroy() {
    // this.querySubscription.unsubscribe();
  }
}
