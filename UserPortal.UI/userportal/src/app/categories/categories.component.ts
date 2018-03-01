import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import { Category } from '../entities/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private ctgService: CategoryService) { }
  categories: Array<Category>;

  ngOnInit() {
    this.ctgService.getCategories().subscribe(res => {this.categories = res; console.log(res); });
  }

}
