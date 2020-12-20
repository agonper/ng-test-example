import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SERVICIO_DISPOSITIVOS} from './dispositivos/servicios/i-dispositivos';
import {DispositivosService} from './dispositivos/servicios/dispositivos.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: SERVICIO_DISPOSITIVOS, useClass: DispositivosService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
