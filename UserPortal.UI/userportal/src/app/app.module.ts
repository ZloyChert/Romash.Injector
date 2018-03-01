import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/categories.service';
import { ElementsService } from './services/elements.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartScreenComponent } from './start.screen/start.screen.component';
import { AppRoutingModule } from './/app.routing.module';
import { TutorialComponent } from './tutorial/tutorial.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreatesComponent } from './category.creates/category.creates.component';
import { CategoryViewComponent } from './category.view/category.view.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartScreenComponent,
    TutorialComponent,
    CategoriesComponent,
    CategoryCreatesComponent,
    CategoryViewComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CategoryService,
    ElementsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
