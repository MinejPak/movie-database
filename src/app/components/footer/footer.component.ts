import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public getScreenWidth: any;
  isDesktop: boolean = true;

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
    if(this.getScreenWidth < 880) {
      this.isDesktop = false;
    }
    else {
      this.isDesktop = true;
    }
  }

}
