/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { SyncService } from 'src/app/services/sync/sync.service';

import { DbService } from 'src/app/services/db/db.service';

import { EventsService } from 'src/app/services/events/events.service';

import { Router } from '@angular/router';

import { Platform, MenuController, AlertController, LoadingController } from '@ionic/angular';

// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx'; //! UNUSED

// import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx'; //? TEMP

import { APP_VERSION } from 'src/environments/version';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'app';
  APP_VERSION = APP_VERSION;

  window = window;

  devMode = false;
  mobileMode = false;
  portraitMode = false;
  theme = 'light';
  loggedIn = false;
  isLoading = false;

  constructor(
    public db: DbService,
    public sync: SyncService,
    public router: Router,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
    public alertController: AlertController,
    private menu: MenuController,
    // private screenOrientation: ScreenOrientation, //! UNUSED
    private events: EventsService,
    public loadingController: LoadingController,
    // private backgroundMode: BackgroundMode, //? TEMP
  ) {
    console.log(`[${this.title}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#constructor/ready]`);

      this.events.subscribe('sync:finished', async (data: any) => {
        console.log(`[${this.title}#constructor/ready] EVENT = sync:finished`, data.time);

        this.popover('Sincronização concluída.', this.devMode ? 30000 : 3000);
      });

      this.theme = await this.db.getVar('theme', this.title) || 'light';

      this.loggedIn = await this.db.getVar('loggedIn', this.title) || false;

      // console.log(`[${this.title}#constructor/ready] set screenOrientation -> PORTRAIT`); //! UNUSED
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); //! UNUSED

      this.mobileMode = !this.platform.is('tablet');
      console.log(`[${this.title}#constructor/ready] mobileMode:`, this.mobileMode);

      // this.backgroundMode.enable(); //? TEMP
      // console.log(`[${this.title}#constructor/ready] backgroundMode:`, this.backgroundMode.isActive()); //? TEMP

      await this.alertDbCap();
    });
  }

  updateView(from: any): void {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges();
  }

  redirectTo(from: any, url: any): void {
    console.log(`[${this.title}#redirectTo] (${from})`, url);

    if (url == 'login' && this.loggedIn) { this.confirmExit(); return; }
    this.router.navigateByUrl('/' + url.replace('/', ''));
  }

  async startLoading(msg: any = 'Carregando...') {
    console.log(`[${this.title}#startLoading] isLoading`, this.isLoading, '| msg', msg);

    if (this.isLoading == true) return;

    this.isLoading = true;

    try {
      console.log(`[${this.title}#startLoading] RUN (BEFORE) | isLoading`, this.isLoading);

      const loading = await this.loadingController.create({
        message: msg,
        duration: 0,
        id: 'loading'
      });

      await loading.present();

      console.log(`[${this.title}#startLoading] RUN (AFTER) | isLoading`, this.isLoading);

      this.updateView(this.title);
    } catch (error) {
      console.log(`[${this.title}#startLoading] ERROR | isLoading`, this.isLoading, error);

      this.isLoading = false;
    }
  }

  async stopLoading() {
    console.log(`[${this.title}#stopLoading] isLoading`, this.isLoading);

    if (this.isLoading == false) return;

    this.isLoading = false;

    try {
      console.log(`[${this.title}#stopLoading] RUN (BEFORE) | isLoading`, this.isLoading);

      await this.loadingController.dismiss('loading');

      console.log(`[${this.title}#stopLoading] RUN (AFTER) | isLoading`, this.isLoading);

      this.updateView(this.title);
    } catch (error) {
      console.log(`[${this.title}#stopLoading] ERROR | isLoading`, this.isLoading, error);

      this.isLoading = true;
    }
  }

  goBack(): void {
    const currentPage = this.router.url.replace('/', '');
    console.log(`[${this.title}#goBack] currentPage`, currentPage);

    this.redirectTo(this.title, {
      'login': '', //! DEPRECATED

      'politica-de-privacidade': this.loggedIn ? 'menu' : 'login',
      'termos-de-uso': this.loggedIn ? 'menu' : 'login',
      'sobre': this.loggedIn ? 'menu' : 'login',

      '': 'menu',
      'sincronizacao': 'menu',
      'listar': 'menu',
      'pagar': 'menu',
      'test': 'menu',
      'relatorio': 'menu',

      'dev-menu': 'login',
      'menu': 'login',

      'checklist': 'listar',
      'sem-agendamento': 'listar',
    }[currentPage || '']);
  }

  async confirmExit(): Promise<void> {
    console.log(`[${this.title}#confirmExit]`);

    const alert = await this.alertController.create({
      cssClass: 'alerts-fullscreen',
      header: 'Aviso',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          cssClass: 'alerts-cancel',
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log(`[${this.title}#confirmExit] CANCEL`);
          }
        },
        {
          cssClass: 'alerts-accept',
          text: 'Sair',
          handler: async () => {
            console.log(`[${this.title}#confirmExit] ACCEPT`);

            await this.db.setTbUser({}, this.title);
            await this.db.setVar('rememberLogin', false, this.title);
            await this.db.setVar('loggedIn', false, this.title);
            this.loggedIn = false;
            this.redirectTo(this.title, 'login');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`[${this.title}#confirmExit] role`, role);

    this.updateView(this.title);
  }

  async showAlert(topic: string, msg: string): Promise<void> {
    console.log(`[${this.title}#showAlert] topic`, topic);
    console.log(`[${this.title}#showAlert] msg`, msg);

    const alert = await this.alertController.create({
      cssClass: 'alerts-fullscreen',
      header: topic,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`[${this.title}#showAlert] role`, role);
  }

  popover(msg: string, ms?: number) {
    // console.log(`[${this.title}#popover] ms:`, ms, 'msg:', msg);

    const popover = document.getElementById('popover');
    (popover?.childNodes[1] as HTMLSpanElement).innerText = msg;

    popover?.classList.add('popover-active');
    console.log(`[${this.title}#popover] (ON) ms:`, ms, 'msg:', msg);

    setTimeout(() => {
      popover?.classList.remove('popover-active');
      console.log(`[${this.title}#popover] (OFF) ms:`, ms, 'msg:', msg);
    }, ms || 3000);
  }

  toggleSettings(): void {
    console.log(`[${this.title}#toggleSettings]`);
    this.menu.enable(true, 'settings');
    this.menu.toggle('settings');
  }

  async toggleTheme(): Promise<void> {
    console.log(`[${this.title}#toggleTheme] (BEFORE) theme`, this.theme);

    if (this.theme == 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }

    await this.db.setVar('theme', this.theme, this.title);
    document.body.setAttribute('color-theme', this.theme);

    console.log(`[${this.title}#toggleTheme] (AFTER) theme`, this.theme);
  }

  defaultOrder(): number { return 0; }

  async alertDbCap() {
    const cap = 50;
    console.log(`[${this.title}#alertDbCap] cap`, cap);

    await this.db.query('SELECT COUNT(*) FROM "tb_checklist"').then(async data => {
      console.log(`[${this.title}#alertDbCap] data`, data);
      console.log(`[${this.title}#alertDbCap] data[0]`, data[0]);
      console.log(`[${this.title}#alertDbCap] data[0]['COUNT(*)']`, data[0]['COUNT(*)']);

      if (data[0]['COUNT(*)'] >= cap) {
        await this.showAlert('Quantidade de registros', `Você atingiu ${cap} registros. Por favor, limpe os dados para continuar utilizando o aplicativo com máxima perfomance.\nAcesse: MENU -> RELATORIO -> APAGAR SINCRONIZADOS`);
      }
    });
  }
}
