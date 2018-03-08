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
    });
  }

  onElementClick(id: number): void {
    this.activeElementId = id;
  }

  get ActiveElementHtml(): string {
    if (this.elements && this.elements.length > 0 && this.activeElementId) {
      return unescape(this.elements.find(n => n.Id === this.activeElementId).HtmlElement);
    }
    return '';
  }

  onNewElementClick(): void {
    this.router.navigateByUrl('/create/element/' + this.categoryId);
  }

  getElements() {
    this.elmnService.getElementsByCategoryId(this.categoryId).subscribe(res => {
      this.elements = res;
    });
  }

}
