import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "../config.service";
import {Apollo} from "apollo-angular";
import {GET_MOVIE_BY_ID} from "../graphql";
import {Subscription} from "apollo-client/util/Observable";
import {MovieDetail} from "../models/models";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  movieDetail: MovieDetail;
  private querySubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
              private apollo: Apollo,
              private configService: ConfigService) {
    console.log('hllo from details component');
    console.log(this.configService.getConfig());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.movieID = params['id']);
    this.configService.createApollo();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_MOVIE_BY_ID,
      variables: {id: this.movieID}
    })
      .valueChanges
      .subscribe(({data}) => {
        console.log(data);
        this.movieDetail = data.getMovieById;
        console.log(this.movieDetail);
      });
  }

  ngOnDestroy() {
    this.activatedRoute.params.subscribe().unsubscribe();
  }



}
