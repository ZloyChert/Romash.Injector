import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset.list.component.html',
  styleUrls: ['./preset.list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PresetListComponent implements OnInit {

  public presets: any;

  constructor() { }

  ngOnInit() {
    this.presets = [
      {
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },{
        id: 1,
        name: 'Witcher'
      },
      {
        id: 2,
        name: 'Artists'
      },
      {
        id: 3,
        name: 'Funny Animals'
      },
    ]
  }

}
