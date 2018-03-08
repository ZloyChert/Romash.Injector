import { Component, OnInit, OnChanges } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import { Category } from '../entities/category';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnChanges {
  //[ngStyle]="{background: getRandomColor()}" 
  
  newElementText = "Add new";

  constructor(private ctgService: CategoryService, private router: Router, private route: ActivatedRoute) { }
  categories: Array<Category>;

  ngOnInit() {
    this.ctgService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  getRandomColor(): string {
    return ('#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  onCategoryClick(id: number): void {
    this.router.navigateByUrl('/category/' + id);
  }
}
