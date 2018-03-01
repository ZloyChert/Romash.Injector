import { Component, OnInit } from '@angular/core';
import { HeaderItem } from '../entities/header.item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerItems: Array<HeaderItem>;

  constructor() { }

  ngOnInit() {
    this.headerItems = [
      {
        Id: 1,
        Name: 'Tutorial',
        Url: 'tutorial'
      },
      {
        Id: 2,
        Name: 'Categories',
        Url: 'categories'
      },
      {
        Id: 3,
        Name: 'Create',
        Url: 'create'
      },
      {
        Id: 4,
        Name: 'Added items',
        Url: 'added'
      }
    ];
  }

}
