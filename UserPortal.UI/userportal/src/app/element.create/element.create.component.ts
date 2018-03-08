import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ElementsService } from '../services/elements.service';
import { SafeHtmlPipe } from '../services/safe.html.pipe';
import { FrameElement } from './../entities/element';

@Component({
  selector: 'app-element-create',
  templateUrl: './element.create.component.html',
  styleUrls: ['./element.create.component.css']
})
export class ElementCreateComponent implements OnInit {

  private categoryId: number;
  elementName: string;
  elementHtml = '';
  private agentStatusPipe: SafeHtmlPipe;
  options: any = {printMargin: false };

  constructor(private router: Router, private route: ActivatedRoute, private elmnService: ElementsService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.categoryId = +params['id'];
      }
    });
  }

  onCreateClick(): void {
    const element = new FrameElement();
    element.HtmlElement = escape(this.elementHtml);
    element.Name = this.elementName;
    element.CategoryId = this.categoryId;
    this.elmnService.createElement(element).subscribe(() => { });
    this.router.navigateByUrl('/category/' + this.categoryId);
  }

}
