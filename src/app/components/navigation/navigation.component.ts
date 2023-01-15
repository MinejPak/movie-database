import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menuShowing: boolean = false;
  menuExpandedMovies: boolean = false;
  menuExpandedShows: boolean = false;
  menuExpandedPeople: boolean = false;
  searchShowing: boolean = false;

  constructor() {}

  ngOnInit(): void {
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
}
