import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsiblePageComponent } from './responsible-page.component';

const routes: Routes = [{ path: '', component: ResponsiblePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsiblePageRoutingModule { }
