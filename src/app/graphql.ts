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

export const GET_MOVIE_BY_ID = gql`query GetOneMovie($movieId: String!) {
  getMovieById(id:$movieId) {
    title
    overview
    voteAverage
    backdropPath
    posterPath
  }
}`;

export const GET_RATINGS_FOR_USER = gql`query Ratings($userId: String!) {
  getUserById(id: $userId) {
    ratings {
      id
      comment
      rating
      movie {
        id
      }
    }
  }
}`;

// export const GET_RATING_BY_USER_AND_MOVIE = gql`query GetOneRating($userId: String!, $movieId: String!) {
//   ratingByUserAndMovie(userId:$userId, movieId: $movieId) {
//     comment
//     id
//     rating
//   }
// }`;
export const GET_ALL_USERS = gql`query GetAllUsers {
  allUsers{
    id
    name
  }
}`;
