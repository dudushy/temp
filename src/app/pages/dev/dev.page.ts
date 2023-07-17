/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.scss'],
})
export class DevPage implements OnInit {
  title = 'dev';

  allPages: any = [];
  BASE_URL: any;

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

      this.allPages = [];
      const allRoutes = this.app.router.config;
      for (const route of allRoutes) {
        if (route.path != '') {
          if (route.path != 'dev-menu') {
            this.allPages.push(route.path);
          }
        }
      }
      console.log(`[${this.title}#ionViewDidEnter] allPages`, this.allPages);

      const result = await this.app.db.getVar('devMode', this.title);
      if (result) { this.app.devMode = result; } else { this.app.devMode = false; }

      console.log(`[${this.title}#ionViewDidEnter] devMode`, this.app.devMode);

      this.BASE_URL = await this.app.db.getVar('BASE_URL', this.title);

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

  async updateBaseUrl(newUrl: any): Promise<void> {
    console.log(`[${this.title}#updateBaseUrl] newUrl`, newUrl);

    this.app.db.setVar('BASE_URL', newUrl, this.title);

    await this.app.showAlert('BASE_URL', 'A URL foi atualizada com sucesso.');
  }

  async dropTable(table: any): Promise<void> {
    console.log(`[${this.title}#dropTable] table`, table);

    await this.app.db.dropTable(table, this.title);
  }

  async toggleDevMode(): Promise<void> {
    console.log(`[${this.title}#toggleDevMode] (BEFORE) devMode`, this.app.devMode);

    await this.app.db.setVar('devMode', !this.app.devMode, this.title);

    this.app.devMode = await this.app.db.getVar('devMode', this.title);

    console.log(`[${this.title}#toggleDevMode] (AFTER) devMode`, this.app.devMode);

    this.updateView();
  }

  async selectAllFromTable(table: any): Promise<void> {
    const result = await this.app.db.get(table, '*', this.title);
    console.log(`[${this.title}#selectAllFromTable] (${table}) result`, result);
  }

  async resetDir(folder: any) {
    console.log(`[${this.title}#resetDir] folder`, folder);

    await this.app.file.removeRecursively(this.app.file.dataDirectory, `${this.app.APP_NAME}_${folder}`);
    console.log(`[${this.title}#resetDir] removed ${folder}`);

    await this.app.file.createDir(this.app.file.dataDirectory, `${this.app.APP_NAME}_${folder}`, false);
    console.log(`[${this.title}#resetDir] created ${folder}`);
  }
}
