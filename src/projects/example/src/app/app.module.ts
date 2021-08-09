import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BSServiceModule } from '@buggolf/angular-base-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BSServiceModule.forRoot({
      baseUrl: "/api"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
