import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ConfigService} from './config.service';
import {ConfigModel} from './models/config.model';
import {HttpLink} from "apollo-angular-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Subscription} from "apollo-client/util/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private configService: ConfigService;
  public configModel: ConfigModel;
  private apollo: Apollo;
  private httpLink: HttpLink;
  title = 'app';
  private querySubscription: Subscription;

  constructor(apollo: Apollo, configService: ConfigService, httpLink: HttpLink) {
    this.apollo = apollo;
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:8080/graphql'}),
      cache: new InMemoryCache()
    });
    console.log('from constructor in appcomponent');
    console.log(this.apollo.getClient());
  }

  ngOnInit() {
    const GET_CONFIGURATION = gql`query Conf {
      config {
        baseUrl
        secureBaseUrl
        logoSizes
        posterSizes
        profileSizes
        stillSizes
        backdropSizes
      }
    }`;

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_CONFIGURATION
    })
      .valueChanges
      .subscribe(({data}) => {
        this.configModel = data.config;
      });
  }
}
