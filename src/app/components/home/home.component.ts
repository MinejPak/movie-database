import { popularMovies } from './../../models/popularMovies.model';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMoviesArray: any;
  isFetching: boolean = false;
  currentPage: number = 1;
  totalPages: number;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.fetchPopularMovies(this.currentPage);
  }

  fetchPopularMovies(page: number) {
    this.movieService.fetchMovies(page).subscribe((response: popularMovies) => {
      this.isFetching = true;
      this.totalPages = response.total_pages;
      this.popularMoviesArray = response.results;
      this.isFetching = false;
    })
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.fetchPopularMovies(this.currentPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  showDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
