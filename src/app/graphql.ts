import gql from 'graphql-tag';

export const GET_MOVIE_MASTER_WITH_CONFIG = gql`query MovieMaster {
    allMovies {
        id
  	    title
        releaseDate
        posterPath
        voteAverage
      }
    config {
        baseUrl
        secureBaseUrl
        logoSizes
        posterSizes
        profileSizes
        stillSizes
        backdropSizes
      }
    }`;

export const GET_MOVIE_BY_ID = gql`query GetOneMovie {
  getMovieById(id:"447332") {
    title
    overview
    voteAverage
    ratings {
      id
      user{
        name
      }
    }
    posterPath
  }
}`;
