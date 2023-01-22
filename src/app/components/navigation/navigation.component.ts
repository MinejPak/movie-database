import { popularMovies } from './../../models/popularMovies.model';
import { MovieService } from './../../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  hasFetchedData: boolean = false;
  public getScreenWidth: any;
  isFetching: boolean = false;
  trendingMoviesArray: any;
  isDesktop: boolean = true;
  menuShowing: boolean = false;
  menuExpandedMovies: boolean = false;
  menuExpandedShows: boolean = false;
  menuExpandedPeople: boolean = false;
  menuMoviesHover: boolean = false;
  menuShowsHover: boolean = false;
  menuPeopleHover: boolean = false;
  menuMoreHover: boolean = false;
  showAccountTooltip: boolean = false;
  searchShowing: boolean = false;
  query: string = "";

  constructor(private router: Router, private _Activatedroute:ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.checkViewport();
  }

  fetchTrendingMovies(type: string, time: string) {
    this.isFetching = true;
    this.movieService.fetchTrending(type, time).subscribe((response: popularMovies) => {
      this.trendingMoviesArray = response.results;
      this.isFetching = false;
      this.hasFetchedData = true;
    })
  }

  fetchSearchResults() {
    this.movieService.searchMovies(this.query).subscribe((response: popularMovies)=> {
      this.trendingMoviesArray = response.results
      this.isFetching = false;
    })
  }

  fetchResults() {
    if(this.query) {
      this.isFetching = true;
      const timeOut = setTimeout(() => this.fetchSearchResults(), 1500);
      return () => clearTimeout(timeOut);
    }
    else {
        this.isFetching = false;
    }
    return false;
  }

  checkViewport() {
    if(this.getScreenWidth < 800) {
      this.isDesktop = false;
    }
    else {
      this.isDesktop = true;
    }
  }

  expandMobileMenu(e) {
    const target = e.target.textContent.toLowerCase();
    switch(target) {
      case "movies":
        this.menuExpandedMovies = !this.menuExpandedMovies
        break;
      case "tv shows":
        this.menuExpandedShows = !this.menuExpandedShows
        break;
      case "people":
        this.menuExpandedPeople = !this.menuExpandedPeople;
        break;
      default:
        break;
    }
    return false;
  }

  showSearch() {
    if(!this.hasFetchedData) {
      this.fetchTrendingMovies("all", "day");
    }
    this.menuShowing = false;
    this.searchShowing = !this.searchShowing;
  }

  onKeydown() {
    if(this.query) {
      this.router.navigate(['/search', this.query]);
      this.searchShowing = false;
      this.query = "";
    }
  }
}
