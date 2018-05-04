import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "../config.service";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieID: string;
  constructor(private activatedRoute: ActivatedRoute, private configService: ConfigService,
              private apollo: Apollo) {
    console.log('hello from details component');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.movieID = params['id']);
  }

  ngOnDestroy() {
    this.activatedRoute.params.subscribe().unsubscribe();
  }



}
