import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-creates',
  templateUrl: './category.creates.component.html',
  styleUrls: ['./category.creates.component.css']
})
export class CategoryCreatesComponent implements OnInit {

  categoryName: string;

  constructor(private ctgService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateClick(): void {
    let categoryId;
    this.ctgService.createCategory(this.categoryName).subscribe(res => {
      categoryId = res;
      this.router.navigateByUrl('category/' + categoryId);
    });
  }
}
