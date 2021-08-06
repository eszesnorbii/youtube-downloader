import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservableHandlerComponent } from './observable-handler.component';
import { IonicModule } from '@ionic/angular';
import { WithLoadingModule } from '../../pipes/with-loading/with-loading.module';

@NgModule({
  declarations: [ObservableHandlerComponent],
  imports: [
    CommonModule,
    IonicModule,
    WithLoadingModule
  ],
  exports: [ObservableHandlerComponent]
})
export class ObservableHandlerModule { }
