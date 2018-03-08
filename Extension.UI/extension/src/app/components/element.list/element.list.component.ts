import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './../../services/categories.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element.list.component.html',
  styleUrls: ['./element.list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ElementListComponent implements OnInit {
 
  elements: any;
  private categoryId: number;
  SendMessage: 'sendmessage';

  constructor(private router: Router, private route: ActivatedRoute, private ctgService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.categoryId = +params['id'];
      }
      this.ctgService.getElementsByCategoryId(this.categoryId).subscribe(res => this.elements = res);
      console.info(this.categoryId);
    });
  }

  public postMessage(message: any, action: string): void {
    window.top.postMessage({
      action: action,
      message: message
    }, '*');
  }

  public elementClick(guid: string): void {
    console.log('click');
    this.postMessage({Guid: guid}, 'sendmessage');
    //this.ctgService.sendMessage('https://vk.com/im?peers=81716652_104311525_175712462&sel=70889092', guid).subscribe(() => {});
  }
}
