import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start.screen.component.html',
  styleUrls: ['./start.screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  tutorialClick(): void {
    this.router.navigateByUrl('tutorial');
  }

  getStartedClick(): void {
    this.router.navigateByUrl('categories');
  }

}
