/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  title = 'record';

  checklistArray: any[] = [];

  countSynced = 0;
  countUnsynced = 0;

  devMode: boolean = false;

  constructor(
    public app: AppComponent,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
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

      this.countSynced = 0;
      this.countUnsynced = 0;

      const result = await this.app.db.getVar('devMode', this.title);
      if (result) { this.devMode = result; } else { this.devMode = false; }

      console.log(`[${this.title}#ionViewDidEnter] devMode`, this.devMode);

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

  isImage(index: any, value: any): boolean {
    const indexCondition = index.includes('foto') || index.includes('imagem');
    // console.log(`[${this.title}#isImage] indexCondition:`, indexCondition);

    const valueCondition = value != null && value != '';
    // console.log(`[${this.title}#isImage] valueCondition:`, valueCondition);

    return indexCondition && valueCondition;
  }

  async loadChecklists() {
    console.log(`[${this.title}#loadChecklists] (BEFORE) checklistArray`, this.checklistArray);

    this.countSynced = 0;
    this.countUnsynced = 0;

    await this.app.startLoading();

    const rawChecklistsArray = await this.app.db.selectTbChecklist('*') || [];
    console.log(`[${this.title}#loadChecklists] rawChecklistsArray:`, rawChecklistsArray);

    this.checklistArray = rawChecklistsArray.reverse();
    console.log(`[${this.title}#loadChecklists] checklistArray:`, this.checklistArray);
    console.log(`[${this.title}#loadChecklists] checklistArray.length:`, this.checklistArray.length);

    for (const [key, value] of Object.entries(this.checklistArray)) {
      console.log(`[${this.title}#loadChecklists] key {${key}} |`, value);
      value['sync'] == 1 ? this.countSynced++ : this.countUnsynced++;
    }

    await this.app.stopLoading();

    console.log(`[${this.title}#loadChecklists] (AFTER) checklistArray`, this.checklistArray);
  }

  async wipeSyncedChecklists() {
    console.log(`[${this.title}#wipeSyncedChecklists]`);

    const alert = await this.app.alertController.create({
      cssClass: 'alerts-fullscreen',
      header: 'Aviso',
      message: 'Deseja realmente limpar os checklists sincronizados?',
      buttons: [
        {
          cssClass: 'alerts-cancel',
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log(`[${this.title}#wipeSyncedChecklists] CANCEL`);
          }
        },
        {
          cssClass: 'alerts-accept',
          text: 'Limpar',
          handler: async () => {
            console.log(`[${this.title}#wipeSyncedChecklists] ACCEPT`);

            await this.app.db.query('DELETE FROM "tb_checklist" WHERE sync = "1"');
            await this.app.db.query('DELETE FROM "tb_image" WHERE sync = "1"');
            await this.app.db.query('DELETE FROM "tb_log"');

            await this.loadChecklists();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`[${this.title}#wipeSyncedChecklists] role`, role);

    this.updateView();
  }

  async wipeUnsyncedChecklists() {
    console.log(`[${this.title}#wipeUnsyncedChecklists]`);

    const alert = await this.app.alertController.create({
      cssClass: 'alerts-fullscreen',
      header: 'Aviso',
      message: 'Deseja realmente limpar os checklists não sincronizados?',
      buttons: [
        {
          cssClass: 'alerts-cancel',
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log(`[${this.title}#wipeUnsyncedChecklists] CANCEL`);
          }
        },
        {
          cssClass: 'alerts-accept',
          text: 'Limpar',
          handler: async () => {
            console.log(`[${this.title}#wipeUnsyncedChecklists] ACCEPT`);

            await this.app.db.query('DELETE FROM "tb_checklist" WHERE sync = "0"');
            await this.app.db.query('DELETE FROM "tb_image" WHERE sync = "0"');
            await this.app.db.query('DELETE FROM "tb_log"');

            await this.loadChecklists();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`[${this.title}#wipeUnsyncedChecklists] role`, role);

    this.updateView();
  }
}
