import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleNamePipe } from './role-name.pipe';

@NgModule({
  declarations: [RoleNamePipe],
  imports: [CommonModule],
  exports: [RoleNamePipe],
})
export class PipesModule {}
