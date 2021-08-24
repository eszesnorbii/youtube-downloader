import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ObservableHandlerModule } from '../shared/components/observable-handler/observable-handler.module';
import { HomePopoverComponent } from './components/home-popover/home-popover.component';
import { HomeModalComponent } from './components/home-modal/home-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ObservableHandlerModule
  ],
  declarations: [HomePage, HomePopoverComponent, HomeModalComponent]
})
export class HomePageModule {}
