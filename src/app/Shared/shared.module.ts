import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
<<<<<<< HEAD
  declarations: [],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [HttpClientModule, ReactiveFormsModule, FormsModule]
=======
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [AngularMaterialModule, ReactiveFormsModule, FormsModule],
  declarations: []
>>>>>>> f0867d2c5f7eb7ecc80990bc5a5f81ad6027d152
})
export class SharedModule {}
