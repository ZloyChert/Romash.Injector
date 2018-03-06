import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ElementsService } from '../services/elements.service';
import { FrameElement } from '../entities/element';

@Component({
  selector: 'app-category-view',
  templateUrl: './category.view.component.html',
  styleUrls: ['./category.view.component.css']
})
export class CategoryViewComponent implements OnInit {

  private categoryId: number;
  elements: Array<FrameElement>;
  activeElementId: number;

  constructor(private router: Router, private route: ActivatedRoute, private elmnService: ElementsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.categoryId = +params['id'];
      }
      this.getElements();
      if (this.elements[0]) {
        this.activeElementId = this.elements[0].Id;
      }
    });
  }

  onElementClick(id: number): void {
    this.activeElementId = id;
  }

  get ActiveElementHtml(): string {
    return this.elements.find(n => n.Id === this.activeElementId).HtmlElement;
  }

  getElements() {
    this.elmnService.getElementsByCategoryId(this.categoryId).subscribe(res => {
      this.elements = res;
    });
  }

}
