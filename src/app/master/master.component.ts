import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {ConfigModel, MovieMaster} from '../models/models';
import {GET_MOVIE_MASTER_WITH_CONFIG} from '../graphql';
import {Subscription} from 'apollo-client/util/Observable';
import {Apollo} from 'apollo-angular';
import {UserService} from "../user.service";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  public configModel: ConfigModel;
  allMovies: MovieMaster[];
  private querySubscription: Subscription;

  dataIsFetched: boolean;
  imagePath = '';


  constructor(private configService: ConfigService,
              private apollo: Apollo,
              private userService: UserService) {
    console.log('hello from master constructor');
    this.dataIsFetched = false;
  }

  ngOnInit() {;
    this.configService.createApollo();

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_MOVIE_MASTER_WITH_CONFIG
    })
      .valueChanges
      .subscribe(({data}) => {
        this.configModel = data.config;
        // this.configService.setConfig(this.configModel);
        this.allMovies = data.allMovies;
        this.setPosterPath();
      });
  }

  setPosterPath() {
    this.imagePath = this.configService.getConfig().secureBaseUrl + this.configModel.posterSizes[6];
  }

}
