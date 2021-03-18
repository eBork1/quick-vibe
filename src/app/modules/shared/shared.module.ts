import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';



@NgModule({
  declarations: [
    // Components go here
    HeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule { }
