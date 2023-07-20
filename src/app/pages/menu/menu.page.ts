/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  title = 'menu';

  loginData: any;
  username: any;

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

      this.loginData = await this.app.db.query('SELECT * FROM "tb_user" WHERE id = "1"');
      console.log(`[${this.title}#ionViewDidEnter] loginData`, this.loginData);

      if (this.loginData.length > 0) {
        this.username = this.loginData[0].str_nome;
        console.log(`[${this.title}#ionViewDidEnter] username`, this.username);
      }

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

  async redirectToList(url: string): Promise<void> {
    await this.app.db.setVar('listarMode', url, this.title);
    await this.redirectTo('list');
  }
}
