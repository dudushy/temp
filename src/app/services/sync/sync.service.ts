/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

// import { HTTP } from '@awesome-cordova-plugins/http/ngx'; //! UNUSED

import { DbService } from 'src/app/services/db/db.service';

import { Platform } from '@ionic/angular';

import { EventsService } from 'src/app/services/events/events.service';

// import { File } from '@awesome-cordova-plugins/file/ngx'; //! UNUSED

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  title = '@sync';

  isSyncing = false;

  constructor(
    private db: DbService,
    public platform: Platform,
    private events: EventsService,
  ) {
    console.log(`[${this.title}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#constructor/ready]`);

      this.events.subscribe('checklist:ready2sync', (data: any) => {
        console.log(`[${this.title}#constructor/ready] EVENT = checklist:ready2sync`, data.time);
      });
    });
  }
}
