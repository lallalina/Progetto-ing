import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponsiblePageComponent } from './responsible-page.component';

const routes: Routes = [{ path: '', component: ResponsiblePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,SharedModule]
})
export class ResponsiblePageRoutingModule { }
