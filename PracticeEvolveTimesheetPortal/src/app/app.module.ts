import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetsModule } from './modules/timesheets/timesheets.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimesheetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
