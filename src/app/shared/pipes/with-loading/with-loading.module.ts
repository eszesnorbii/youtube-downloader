import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithLoadingPipe } from './with-loading.pipe';
import { IonicModule } from '@ionic/angular';
import { ErrorHandlerComponent } from '../../components/error-handler/error-handler.component';
import { ErrorComponent } from '../../components/error/error.component';

@NgModule({
    declarations: [WithLoadingPipe, ErrorHandlerComponent, ErrorComponent],
    imports: [CommonModule, IonicModule],
    exports: [WithLoadingPipe, ErrorHandlerComponent, ErrorComponent],
    providers: [WithLoadingPipe],
})
export class WithLoadingModule { }
