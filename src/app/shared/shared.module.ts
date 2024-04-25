import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { loadingSpinnerComponent } from './loadingSpinner/loadingSpinner.component';

@NgModule({
  declarations: [loadingSpinnerComponent, AlertComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [
    loadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
