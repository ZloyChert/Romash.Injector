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

  constructor(private router: Router, private route: ActivatedRoute, private elmnService: ElementsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.categoryId = +params['id'];
      }
    });
  }

  getElements() {
    this.elmnService.getElements(this.categoryId).subscribe(res => {
      this.elements = res;
    });
  }

}
