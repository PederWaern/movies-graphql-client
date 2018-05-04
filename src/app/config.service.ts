import {Injectable, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ConfigModel} from './models/models';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';


@Injectable()
export class ConfigService implements OnInit {
  public config: ConfigModel;
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
  }

  ngOnInit() {
  }

  createApollo() {
    if (this.apollo.getClient() === undefined) {
      this.apollo.create({
        link: this.httpLink.create({uri: 'http://localhost:8080/graphql'}),
        cache: new InMemoryCache()
      });
    }
  }

  getConfig() {
    return this.config;
  }

  setConfig(config: ConfigModel) {
    this.config = config;
  }
}

