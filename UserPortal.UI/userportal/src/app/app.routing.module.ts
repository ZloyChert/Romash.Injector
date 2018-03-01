import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { StartScreenComponent } from './start.screen/start.screen.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreatesComponent } from './category.creates/category.creates.component';
import { CategoryViewComponent } from './category.view/category.view.component';

const routes: Routes = [
  { path: 'tutorial', component: TutorialComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'create', component: CategoryCreatesComponent },
  { path: '', component: StartScreenComponent },
  { path: 'category/:id', component: CategoryViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
