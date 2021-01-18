import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComandaComponent } from './comenzi/comanda/comanda.component';
import { ComenziComponent } from './comenzi/comenzi.component';

const routes: Routes = [
  {path:'',redirectTo:'comanda', pathMatch:'full'},
  {path:'comenzi', component:ComenziComponent},
  {path:'comanda', children:[
    {path:'', component:ComandaComponent}, 
    {path:'edit/:id', component:ComandaComponent} 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
