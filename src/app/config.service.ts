import {Injectable, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ConfigModel} from './models/config.model';
import {Subscription} from 'apollo-client/util/Observable';
import {HttpLink} from "apollo-angular-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

export const GET_CONFIGURATION_QUERY = gql`query Conf {
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

@Injectable()
export class ConfigService implements OnInit {
  public config: ConfigModel;
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
  }

  ngOnInit() {
  }

  createApollo() {
    this.apollo.create({
      link: this.httpLink.create({ uri: 'http://localhost:8080/graphql'}),
      cache: new InMemoryCache()
    });
    console.log('from constructor in appcomponent');
    console.log(this.apollo.getClient());
  }

  getConfig() {
    return this.config;
  }

  setConfig(config: ConfigModel) {
    console.log(config);
    this.config = config;
  }
  test() {
    console.log('test');
  }
}

