import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConfigService} from '../config.service';
import {MovieMaster, User} from '../models/models';
import {GET_MOVIE_MASTER_WITH_CONFIG, MASTER_RATING} from '../graphql';
import {Subscription} from 'apollo-client/util/Observable';
import {Apollo} from 'apollo-angular';
import {UserService} from '../user.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, OnDestroy {
  allMovies = [] as MovieMaster[];
  private querySubscription: Subscription;
  private ratingSubscription: Subscription;
  currentUser: User;

  constructor(private configService: ConfigService,
              private apollo: Apollo,
              private userService: UserService) {
    console.log('hello from master constructor');
  }

  ngOnInit() {
    this.configService.createApollo();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_MOVIE_MASTER_WITH_CONFIG
    })
      .valueChanges
      .subscribe(({data}) => {
        for (const movie of data.allMovies) {
          const newMovie = new MovieMaster();
          newMovie.title = movie.title;
          newMovie.posterPath = movie.posterPath;
          newMovie.id = movie.id;
          newMovie.releaseDate = movie.releaseDate;
          newMovie.voteAverage = movie.voteAverage;
          newMovie.fullImagePath = this.configService.getConfig().secureBaseUrl +
            this.configService.getConfig().posterSizes[6] +
            movie.posterPath;
          this.allMovies.push(newMovie);
        }
        console.log(this.allMovies);
      });
    this.userService.currentUser.asObservable().subscribe((user) => {
      this.currentUser = user;
      this.ratingSubscription = this.apollo.watchQuery<any>({
        query: MASTER_RATING,
        variables: {userId: this.currentUser.id}
      })
        .valueChanges
        .subscribe(({data}) => {
          const ratings = data.ratingsByUser;
          console.log(ratings);
          for (const movie of this.allMovies) {
            movie.userRating = undefined;
            for (let i = 0; i < ratings.length; i++) {
              if (ratings[i].movie.id === movie.id) {
                movie.userRating = ratings[i].rating;
                break;
              }
            }
          }
          console.log(data);
        });
    });
  }

  ngOnDestroy() {
    this.ratingSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

}
