import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  url: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.url=this.router.url;
    console.log(this.url);
  }

}
