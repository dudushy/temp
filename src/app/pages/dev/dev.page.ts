/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { SyncService } from 'src/app/services/sync/sync.service';

import { Platform } from '@ionic/angular';

import { DbService } from 'src/app/services/db/db.service';

import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.scss'],
})
export class DevPage implements OnInit {
  title = 'dev';

  constructor(
    public app: AppComponent,
    public sync: SyncService,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
    public db: DbService,
    private events: EventsService
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit() {
    console.log(`[${this.title}#ngOnInit]`);
  }

  ionViewDidEnter() {
    console.log(`[${this.title}#ionViewDidEnter]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#ionViewDidEnter/ready]`);

      this.updateView();
    });
  }

  defaultOrder() { return 0; }

  updateView() {
    console.log(`[${this.title}#updateView]`);
    this.cdr.detectChanges();
    this.app.updateView(this.title);
  }

  redirectTo(url: string) {
    this.app.redirectTo(this.title, url);
  }
}
