import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './Angular-Material/Angular-Material.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class SharedModule {}
