import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PresetListComponent } from './components/preset.list/preset.list.component';
import { ElementListComponent } from './components/element.list/element.list.component';


@NgModule({
  declarations: [
    AppComponent,
    PresetListComponent,
    ElementListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
