import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from './../../services/categories.service';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset.list.component.html',
  styleUrls: ['./preset.list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PresetListComponent implements OnInit {

  public presets: any;

  constructor(private ctgService: CategoryService) { }

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
        name: 'Roslyn'
      },
      {
        id: 2,
        name: 'Wolfy'
      },
      {
        id: 3,
        name: 'Two carrots'
      },{
        id: 1,
        name: 'Girls'
      },
      {
        id: 2,
        name: 'One man'
      },
      {
        id: 3,
        name: 'Cup of tea'
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
    this.ctgService.getCategories().subscribe((result) => {this.presets = result;console.log(this.presets);});
  }

}
