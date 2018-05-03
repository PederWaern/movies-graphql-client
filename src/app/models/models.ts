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
  title: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}
