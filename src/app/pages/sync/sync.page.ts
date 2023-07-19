/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  title = 'sync';

  logArray: any = [];
  isLoading = false;

  constructor(
    public app: AppComponent,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.title}#constructor]`);

    this.app.events.subscribe('sync:finished', async (data: any) => {
      console.log(`[${this.title}#constructor] EVENT = sync:finished`, data.time);

      if (this.app.router.url == '/sincronizacao') await this.loadChecklists();
    });
  }

  ngOnInit() {
    console.log(`[${this.title}#ngOnInit]`);
  }

  ionViewDidEnter() {
    console.log(`[${this.title}#ionViewDidEnter]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#ionViewDidEnter/ready]`);

      await this.loadChecklists();

      this.updateView();
    });
  }

  defaultOrder() { return 0; }

  updateView() {
    console.log(`[${this.title}#updateView]`);
    this.cdr.detectChanges();
    this.app.updateView(this.title);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(this.title, url);
  }

  async loadChecklists() {
    if (this.isLoading) return;
    this.isLoading = true;

    console.log(`[${this.title}#loadChecklists] (BEFORE) logArray`, this.logArray);

    await this.app.startLoading('Carregando dados...');
    this.updateView();

    this.logArray = await this.app.db.query('SELECT * FROM "tb_log"') || [];
    this.logArray = this.logArray.reverse();

    await this.app.stopLoading();
    this.updateView();

    console.log(`[${this.title}#loadChecklists] (AFTER) logArray`, this.logArray);
    this.isLoading = false;
  }

  async refreshLog(event: any) {
    console.log(`[${this.title}#refreshLog]`);
    await this.app.startLoading('Carregando dados...');

    setTimeout(async () => {
      await this.loadChecklists();

      event.target.complete();
      await this.app.stopLoading();
    }, 2000);
  }

  forceSync() {
    console.log(`[${this.title}#forceSync]`);

    if (!this.app.sync.isSyncing) {
      this.app.showAlert('Aviso', 'Sinconizando!');

      this.app.sync.startSync();
      // this.loadChecklists();
    } else {
      this.app.showAlert('Aviso', 'Sincronização em andamento. Aguarde!');
      // this.loadChecklists();
    }
  }
}
