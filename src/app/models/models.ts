export interface ConfigModel {
  baseUrl: string;
  secureBaseUrl: string;
  logoSizes: string[];
  posterSizes: String[];
  profileSizes: string[];
  stillSizes: string[];
  backdropSizes: string[];
}

export class MovieMaster {
  id: string;
  title: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
  userRating: number;
  fullImagePath: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Rating {
  id: string;
  rating: number;
  comment: string;
  user: User;
  createdTimeStamp: string;
}

export class MovieDetail {
  title: string;
  overview: string;
  voteAverage: number;
  backdropPath: string;
  posterPath: string;
  ratings: Rating[] = [];
}
