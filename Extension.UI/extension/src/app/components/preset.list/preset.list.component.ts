import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from './../../services/categories.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset.list.component.html',
  styleUrls: ['./preset.list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PresetListComponent implements OnInit {

  public presets: any;

  constructor(private ctgService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.ctgService.getCategories().subscribe(result => this.presets = result);
  }

  onCategoryClick(id: number): void {
    this.router.navigateByUrl('category/' + id);
  }
}
