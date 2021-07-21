import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;

  constructor() {
    this.form = this.initformGroup();
  }

  initformGroup(): FormGroup {
    return new FormGroup({
      search: new FormControl(null, Validators.required)
    });
  }

}
