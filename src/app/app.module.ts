import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';


import { AppComponent } from './app.component';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpClientModule} from '@angular/common/http';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ConfigService} from './config.service';
import {ConfigModel} from './models/models';
import { MasterComponent } from './master/master.component';
import {RouterModule, Routes} from '@angular/router';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full'},
  { path: 'movies', component: MasterComponent },
  { path: 'movies/:id', component: DetailsComponent},
  { path: '**', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Apollo, HttpLink, ConfigService],
  bootstrap: [AppComponent]
})

export class AppModule {}





