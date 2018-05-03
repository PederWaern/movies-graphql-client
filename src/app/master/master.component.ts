import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {ConfigModel, MovieMaster} from '../models/models';
import {GET_MOVIE_MASTER_WITH_CONFIG} from '../graphql';
import {Subscription} from 'apollo-client/util/Observable';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  public configModel: ConfigModel;
  allMovies: MovieMaster[];
  private querySubscription: Subscription;


  constructor(private configService: ConfigService,
              private apollo: Apollo) {
    console.log('hello from master constructor');
  }

  ngOnInit() {
    console.log('before create apollo');
    console.log(this.apollo.getClient());
    this.configService.createApollo();

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_MOVIE_MASTER_WITH_CONFIG
    })
      .valueChanges
      .subscribe(({data}) => {
        this.configModel = data.config;
        this.allMovies = data.allMovies;
      });
  }

}
