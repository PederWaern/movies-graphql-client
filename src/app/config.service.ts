import {Injectable, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ConfigModel} from './models/config.model';
import {Subscription} from 'apollo-client/util/Observable';

@Injectable()
export class ConfigService implements OnInit {

  constructor(private apollo: Apollo) {
  }

  public config: ConfigModel;
  private querySubscription: Subscription;
  resp: any;

  ngOnInit() {
  }

  getConfig() {
    return this.config;
  }
  fetchConfig(): ConfigModel {
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
      .subscribe(({ data}) => {
        this.config = data.config;
        console.log('from subscribe in fetchconfig');
        return this.config;
      });
      console.log('from outside subscribe in fetchconfig');
      return null;
  }
}

