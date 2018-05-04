export interface ConfigModel {
  baseUrl: string;
  secureBaseUrl: string;
  logoSizes: string[];
  posterSizes: String[];
  profileSizes: string[];
  stillSizes: string[];
  backdropSizes: string[];
}

export interface MovieMaster {
  id: string;
  title: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
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
}

export interface MovieDetail {
  title: string;
  overview: string;
  voteAverage: number;
  backDropPath: string;
  ratings: Rating[];
}
