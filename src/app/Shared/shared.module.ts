import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './Angular-Material/Angular-Material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [AngularMaterialModule, ReactiveFormsModule, FormsModule],
  declarations: []
})
export class SharedModule {}
