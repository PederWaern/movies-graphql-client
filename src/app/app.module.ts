import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';


import { AppComponent } from './app.component';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpClientModule} from '@angular/common/http';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ConfigService} from './config.service';
import {ConfigModel} from "./models/config.model";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [Apollo, HttpLink, ConfigService],
  bootstrap: [AppComponent]
})


export class AppModule {
  private config: ConfigModel;
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    imageconfig: ConfigService
  ) {
    // apollo.create({
    //   link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
    //   cache: new InMemoryCache()
    // });
  }
}
