import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiBaseService } from "../services/apibase/api-base.service";
import { LocalStorage, LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gents of Lagos';
  constructor(private router: Router, public http:ApiBaseService, private local:LocalStorageService) { }

  ngOnInit() {
    this.local.clear('number');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
