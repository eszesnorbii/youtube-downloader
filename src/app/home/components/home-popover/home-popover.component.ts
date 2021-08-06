import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IPopoverButton } from '../../models/home.models';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
  @Input() buttons: IPopoverButton[] = [];
  @Input() videoId: string;

  constructor(private popover: PopoverController) { }

  ngOnInit() { }

  close(id: string) {
    this.popover.dismiss({ id, videoId: this.videoId });
  }
}
