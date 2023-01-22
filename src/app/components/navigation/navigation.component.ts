import { Router, ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public getScreenWidth: any;
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

  constructor(private router: Router, private _Activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.checkViewport();
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
      this.menuShowing = false;
      this.searchShowing = !this.searchShowing;
  }

  onKeydown(event) {
    this.query = event.target.value;
    if(!this.query) {
      return false;
    }
    this.router.navigate(['/search', this.query]);
    this.searchShowing = false;
    return true;
  }
}
