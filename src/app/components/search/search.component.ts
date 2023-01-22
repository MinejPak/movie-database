import { popularMovies } from './../../models/popularMovies.model';
import { MovieService } from './../../services/movie.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private sub: any;
  query: string;
  searchResultsArray: any;
  isFetching: boolean = false;
  currentPage: number = 1;
  totalPages: number;

  constructor(private route:ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.query = params['query'];
      if(this.query) {
        this.fetchResults(this.query);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchPopularMovies(page: number) {
    this.isFetching = true;
    this.movieService.fetchMovies(page).subscribe((response: popularMovies) => {
      this.searchResultsArray = response.results;
      this.isFetching = false;
    })
  }

  fetchResults(query: string) {
    this.isFetching = true;
    this.movieService.searchMovies(query).subscribe((response: popularMovies)=> {
      this.searchResultsArray = response.results
      this.totalPages = response.total_pages;
    })
    this.isFetching = false;
  }

  showDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  nextPage() {
    if(this.currentPage >= this.totalPages) {
      this.currentPage = 1;
    }
    else {
      this.currentPage = this.currentPage + 1;
      this.fetchPopularMovies(this.currentPage)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
