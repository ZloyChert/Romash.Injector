import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryService } from './services/categories.service';
import { PresetListComponent } from './components/preset.list/preset.list.component';
import { ElementListComponent } from './components/element.list/element.list.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'category/:id', component: ElementListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PresetListComponent,
    ElementListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
