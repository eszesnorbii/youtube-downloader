import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableHandler } from './models/observable-handler.model';

@Component({
  selector: 'app-observable-handler',
  templateUrl: './observable-handler.component.html',
  styleUrls: ['./observable-handler.component.scss'],
})
export class ObservableHandlerComponent {
  @Input() classes: string = '';
  @Input() observable$: Observable<any>;
  @Input() dataTemplate: TemplateRef<ObservableHandler>;
  @Input() noDataTemplate: TemplateRef<void>;
  @Input() resultIsArray: boolean = true;

  constructor() { }
}
