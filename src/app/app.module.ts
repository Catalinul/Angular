import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


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
    ComandaItemeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()

  ],
  entryComponents: [ComandaItemeComponent], //pentru a putea deschide aceasta componenta intr-un pop-up
  providers: [ComandaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
