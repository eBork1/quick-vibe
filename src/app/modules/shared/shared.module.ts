import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    // Components go here
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent],
})
export class SharedModule { }
