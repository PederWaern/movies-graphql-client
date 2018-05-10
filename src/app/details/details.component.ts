import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "../config.service";
import {Apollo} from "apollo-angular";
import {GET_MOVIE_BY_ID, GET_RATINGS_FOR_USER} from "../graphql";
import {Subscription} from "apollo-client/util/Observable";
import {MovieDetail, Rating, User} from "../models/models";
import {UserService} from "../user.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  movieDetail: MovieDetail;
  userRating: Rating;
  backdropPath: string;
  posterPath: string;


  private currentUser: User;
  private querySubscription: Subscription;
  private ratingSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
              private apollo: Apollo,
              private configService: ConfigService,
              private userService: UserService
  ) {}

  ngOnInit() {
    this.backdropPath = '';
    this.posterPath = '';
    this.activatedRoute.params.subscribe(params => this.movieID = params['id']);
    this.configService.createApollo();
    this.userService.currentUser.asObservable().subscribe((user) => {
      this.currentUser = user;
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_MOVIE_BY_ID,
        variables: {movieId: this.movieID}
      })
        .valueChanges
        .subscribe(({data}) => {
          // console.log(data);
          this.movieDetail = data.getMovieById;
          console.log(this.movieDetail);
          this.backdropPath = this.configService.getConfig().baseUrl +
            this.configService.getConfig().backdropSizes[1] +
            this.movieDetail.backdropPath;
          this.posterPath = this.configService.getConfig().baseUrl +
            this.configService.getConfig().posterSizes[3] +
            this.movieDetail.posterPath;
        });
      this.ratingSubscription = this.apollo.watchQuery<any>({
        query: GET_RATINGS_FOR_USER,
        variables: {userId: this.currentUser.id}
      })
        .valueChanges
        .subscribe(({data}) => {
          // console.log(data);
          const ratings = data.getUserById.ratings;
          this.userRating = ratings.find(rating => rating.movie.id === this.movieID);
          console.log(this.userRating);
        });
    });
  }

  ngOnDestroy() {
    this.activatedRoute.params.subscribe().unsubscribe();
    this.querySubscription.unsubscribe();
    this.ratingSubscription.unsubscribe();
  }

  setImagePath() {

  }

}
