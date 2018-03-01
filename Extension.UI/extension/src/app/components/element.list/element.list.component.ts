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
        src: 'http://vignette2.wikia.nocookie.net/vedmak/images/6/61/ЭскельВ3.png/revision/latest?cb=20160422145725'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://s1.1zoom.ru/b5246/198/The_Witcher_3_Wild_Hunt_Geralt_of_Rivia_Warriors_515805_240x320.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://orig00.deviantart.net/17c7/f/2015/099/f/b/geralt_portrait_by_yamaorce-d8p1wqo.jpg'
      },
      {
        id: 1,
        name: 'witch',
        src: 'http://vignette4.wikia.nocookie.net/vedmak/images/5/52/Цири_3_%28Ведьмак_3%29.png/revision/latest?cb=20140814202512'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://orig00.deviantart.net/3df1/f/2016/165/9/6/geralt_of_rivia_hearts_of_stone_render_2_by_alchemist10-da6828p.png'
      },
      {
        id: 1,
        name: 'witch',
        src: 'https://vignette.wikia.nocookie.net/vedmak/images/3/3d/Геральт_В3_рендер.png/revision/latest/scale-to-width-down/332?cb=20160606161733'
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
