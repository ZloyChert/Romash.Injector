import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element.list.component.html',
  styleUrls: ['./element.list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ElementListComponent implements OnInit {
  elements: any;

  constructor() { }

  ngOnInit() {
    this.elements = [
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg'
      }
    ];
  }

  public postMessage(message: any, action: string): void {
    window.top.postMessage({
      action: action,
      message: message
    }, '*');
  }
  public elementClick(): void {
    this.postMessage({nesesary: true}, 'actionresulthighlight');
  }
}
