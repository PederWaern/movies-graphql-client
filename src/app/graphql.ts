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

export const GET_MOVIE_BY_ID = gql`query GetOneMovie($id: String!) {
  getMovieById(id:$id) {
    title
    overview
    voteAverage
    backdropPath
    posterPath
    ratings {
      user {
        name
      }
      rating
      comment
    }
  }
}`;

export const GET_ALL_USERS = gql`query GetAllUsers {
  allUsers{
    id
    name
  }
}`;
