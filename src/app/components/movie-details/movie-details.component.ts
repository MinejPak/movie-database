import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { movieDetails } from './../../models/movie-details.model';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string;
  movieDetailsArray: movieDetails;

  constructor(private http: HttpClient, private _Activatedroute:ActivatedRoute, private movieService: MovieService, private location: Location) {}

  ngOnInit(): void {
    this.movieId = this._Activatedroute.snapshot.paramMap.get("movieId");
    this.fetchMovieDetails();
  }

  fetchMovieDetails() {
    this.movieService.fetchMovieDetails(+this.movieId).subscribe((response: movieDetails) => {
      this.movieDetailsArray = response;
    }) 
  }

  back(): void {
    this.location.back()
  }
}
