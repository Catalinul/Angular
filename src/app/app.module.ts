import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ComenziComponent } from './comenzi/comenzi.component';
import { ComandaComponent } from './comenzi/comanda/comanda.component';
import { ComandaItemeComponent } from './comenzi/comanda-iteme/comanda-iteme.component';
import { ComandaService } from './shared/comanda.service';

@NgModule({
  declarations: [
    AppComponent,
    ComenziComponent,
    ComandaComponent,
    ComandaItemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ComandaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
