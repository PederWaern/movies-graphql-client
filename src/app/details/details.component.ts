import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterModule} from '@angular/router';
import {ConfigService} from '../config.service';
import {Apollo} from 'apollo-angular';
import {DELETE_RATING, GET_MOVIE_BY_ID, GET_RATINGS_FOR_USER, MASTER_RATING, SUBMIT_RATING} from '../graphql';
import {Subscription} from 'apollo-client/util/Observable';
import {MovieDetail, Rating, User} from '../models/models';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  movieDetail: MovieDetail;
  userRatings: Rating[] = [];
  backdropPath: string;
  posterPath: string;
  ratingRange: number[] = [];
  newRating: Rating = {} as Rating;
  @ViewChild('ratingForm') ratingForm: NgForm;

  private currentUser: User;
  private querySubscription: Subscription;
  private ratingSubscription: Subscription;
  ngOnInit() {
    this.backdropPath = '';
    this.posterPath = '';
    this.activatedRoute.params.subscribe(params => this.movieID = params['id']);
    this.configService.createApollo();
    this.userService.currentUser.asObservable().subscribe((user) => {
      this.currentUser = user;
      this.userRatings = [];
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
          this.userRatings = [];
          const ratings = data.getUserById.ratings;
          for (const rating of ratings) {
            if (rating.movie.id === this.movieID) {
              this.userRatings.push(rating);
            }
          }
          console.log(this.userRatings);
        });
    });
  }

  constructor(private activatedRoute: ActivatedRoute,
              private apollo: Apollo,
              private configService: ConfigService,
              private userService: UserService
  ) {
    this.setRatingRange();
  }

  ngOnDestroy() {
    this.activatedRoute.params.subscribe().unsubscribe();
    this.querySubscription.unsubscribe();
    this.ratingSubscription.unsubscribe();
  }

  private setRatingRange() {
    for (let i = 10; i >= 1; i--) {
      this.ratingRange.push(i);
    }
    console.log(this.ratingRange);
  }

  onSubmitClicked() {
    this.submitRating();
  }

  submitRating() {
    return this.apollo.mutate({
      mutation: SUBMIT_RATING,
      refetchQueries: [{ query: GET_RATINGS_FOR_USER, variables: {userId: this.currentUser.id}
      }, {query: MASTER_RATING, variables: {userId: this.currentUser.id}}],
      variables: {
        userId: this.currentUser.id,
        movieId: this.movieID,
        comment: this.newRating.comment,
        movieRating: this.newRating.rating.valueOf()
      }
    }).subscribe((res) => {
      console.log(res);
      this.userRatings.push(this.newRating);
      this.newRating = {} as Rating;
    });
  }

  deleteRating(rating: Rating) {
    return this.apollo.mutate({
      mutation: DELETE_RATING,
      refetchQueries: [{ query: GET_RATINGS_FOR_USER, variables: {userId: this.currentUser.id}},
        { query: MASTER_RATING, variables: {userId: this.currentUser.id}
      }],
      variables: {
        id: rating.id
      }
    }).subscribe((next) => {
      this.userRatings = this.userRatings.filter((rate) => rate.id !== rating.id);
      console.log('after filter');
      console.log(this.userRatings);
    });
  }
}
