import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { material_imports } from "./material-import";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

/**
 * Ham public, ham admin modullarda kerak bo'ladigan umumiy narsalar:
 * Angular Material modullari, formalar va bo'lishadigan komponentlar.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...material_imports
  ],
  declarations: [PageNotFoundComponent],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageNotFoundComponent,
    ...material_imports
  ]
})
export class SharedModule { }
