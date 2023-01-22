import { movieDetails } from './../models/movie-details.model';
import { popularMovies } from './../models/popularMovies.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class MovieService {
  constructor(private http: HttpClient) {}
  apiKey: string = "763b019778e9daa7d226436a257758e9";

  //Fetch from api
  fetchMovies(page: number): Observable<popularMovies> {
    return this.http.get<popularMovies>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  fetchMovieDetails(movieId: number): Observable<movieDetails> {
    return this.http.get<movieDetails>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }

  fetchTrending(type: string, time: string): Observable<popularMovies> {
    return this.http.get<popularMovies>(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${this.apiKey}`);
  }

  searchMovies(query?: string): Observable<popularMovies> {
    return this.http.get<popularMovies>(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${query}`);
  }
}