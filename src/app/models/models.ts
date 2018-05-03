export interface ConfigModel {
  baseUrl: String;
  secureBaseUrl: String;
  logoSizes: String[];
  posterSizes: String[];
  profileSizes: String[];
  stillSizes: String[];
  backdropSizes: String[];
}

export interface MovieMaster {
  title: String;
  releaseDate: String;
  posterPath: String;
  voteAverage: Number;
}
