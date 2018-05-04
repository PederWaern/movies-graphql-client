import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "../config.service";
import {Apollo} from "apollo-angular";
import {GET_MOVIE_BY_ID} from "../graphql";
import {Subscription} from "apollo-client/util/Observable";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  private querySubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
              private apollo: Apollo) {
    console.log('hllo from details component');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.movieID = params['id']);
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_MOVIE_BY_ID,
      variables: {id: this.movieID}
    })
      .valueChanges
      .subscribe(({data}) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.activatedRoute.params.subscribe().unsubscribe();
  }



}
