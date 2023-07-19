/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { SyncService } from 'src/app/services/sync/sync.service';

import { DbService } from 'src/app/services/db/db.service';

import { EventsService } from 'src/app/services/events/events.service';

import { Router } from '@angular/router';

import { Platform, MenuController, AlertController, LoadingController } from '@ionic/angular';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

import { APP_VERSION } from 'src/environments/version';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { File } from '@awesome-cordova-plugins/file/ngx';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'app';
  APP_NAME = 'template-app'
  APP_VERSION = APP_VERSION;
  HOME_PAGE = 'login';
  HOME_DIR = 'template';

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
    public cdr: ChangeDetectorRef,
    public alertController: AlertController,
    public menu: MenuController,
    public screenOrientation: ScreenOrientation,
    public events: EventsService,
    public loadingController: LoadingController,
    public backgroundMode: BackgroundMode,
    public http: HTTP,
    public file: File,
    public camera: Camera,
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

      this.devMode = await this.db.getVar('devMode', this.title) || false;

      // console.log(`[${this.title}#constructor/ready] set screenOrientation -> PORTRAIT`);
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();

      console.log(`[${this.title}#constructor/ready] screenOrientation:`, this.screenOrientation.type, this.screenOrientation.ORIENTATIONS);

      this.portraitMode = this.screenOrientation.type.includes('portrait');
      console.log(`[${this.title}#constructor/ready] portraitMode:`, this.portraitMode);

      this.screenOrientation.onChange().subscribe(() => {
        console.log(`[${this.title}#constructor/ready] screenOrientation/onChange ->`, this.screenOrientation.type, this.screenOrientation.ORIENTATIONS);
        this.portraitMode = this.screenOrientation.type.includes('portrait');
        console.log(`[${this.title}#constructor/ready] portraitMode:`, this.portraitMode);
      });

      this.mobileMode = !this.platform.is('tablet');
      console.log(`[${this.title}#constructor/ready] mobileMode:`, this.mobileMode);

      // try {
      //   alert('backgroundMode TRY');
      //   this.backgroundMode.setDefaults({
      //     title: this.APP_NAME,
      //     text: 'backgroundMode'
      //   });
      //   this.backgroundMode.enable();
      //   this.backgroundMode.on('activate').subscribe(() => {
      //     console.log(`[${this.title}#constructor/ready] backgroundMode:`, this.backgroundMode.isEnabled(), this.backgroundMode.isActive());

      //     alert('backgroundMode SUCCESS');
      //   });
      // } catch (error) {
      //   console.log(`[${this.title}#constructor/ready] backgroundMode ERROR:`, error);
      // }

      // await this.alertDbCap(); //! ALERT DB CAP
    });
  }

  updateView(from: any): void {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges();
  }

  async redirectTo(from: any, url: any): Promise<void> {
    console.log(`[${this.title}#redirectTo] (${from})`, url);

    if (url == 'login' && this.loggedIn) { this.confirmExit(); return; }
    await this.router.navigateByUrl('/' + url);
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
    const currentPage = this.router.url.replace('/', '') || '';
    console.log(`[${this.title}#goBack] currentPage`, currentPage);

    const futurePage = {
      //? currentPage -> futurePage
      '': this.HOME_PAGE,
      'home': 'login',
      'dev': 'login',
      'test': 'home',

    }[currentPage];
    this.redirectTo(this.title, futurePage);
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

            // await this.db.setTbUser({}, this.title);
            await this.db.query('DELETE FROM "tb_user"');
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

      if (data == null) return;

      console.log(`[${this.title}#alertDbCap] data[0]`, data[0]);
      console.log(`[${this.title}#alertDbCap] data[0]['COUNT(*)']`, data[0]['COUNT(*)']);

      if (data[0]['COUNT(*)'] >= cap) {
        await this.showAlert('Quantidade de registros', `Você atingiu ${cap} registros. Por favor, limpe os dados para continuar utilizando o aplicativo com máxima perfomance.\nAcesse: MENU -> RELATORIO -> APAGAR SINCRONIZADOS`);
      }
    });
  }

  async takePhoto(varname: any, mode = 'base64'): Promise<any> {
    console.log(`[${this.title}#takePhoto] varname`, varname);
    console.log(`[${this.title}#takePhoto] mode`, mode);

    let result: any = null;

    try {
      const options: CameraOptions = {
        quality: 100,
        // quality: 60,
        // targetWidth: 500,
        // targetHeight: 500,
        destinationType: mode == 'base64' ? this.camera.DestinationType.DATA_URL : this.camera.DestinationType.FILE_URI, //! BASE64
        // destinationType: this.camera.DestinationType.DATA_URL, //! BASE64
        // destinationType: this.camera.DestinationType.FILE_URI, //! BLOB
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
      console.log(`[${this.title}#takePhoto] options`, options);
      // console.log(`[${this.title}#takePhoto] JSON(options)`, JSON.stringify(options));

      await this.camera.getPicture(options).then(async (imageData) => {
        console.log(`[${this.title}#takePhoto] imageData`, imageData);

        if (mode == 'base64') {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log(`[${this.title}#takePhoto] base64Image`, base64Image);

          result = base64Image;
        }

        if (mode == 'blob') {
          const path = imageData.split('/').slice(0, -1).join('/').concat('/');
          console.log(`[${this.title}#takePhoto] path`, path);

          const file = imageData.split('/').slice(-1)[0];
          console.log(`[${this.title}#takePhoto] file`, file);

          const arrayBuffer = await this.file.readAsArrayBuffer(path, file).then(arrayBuffer => { return arrayBuffer; });
          console.log(`[${this.title}#takePhoto] arrayBuffer`, arrayBuffer);

          const blob = new Blob([arrayBuffer], { type: 'image/png' });
          console.log(`[${this.title}#takePhoto] blob`, blob);

          result = blob;
        }
      }, (error) => {
        console.log(`[${this.title}#takePhoto] error`, error);
      });
    } catch (error) {
      console.log(`[${this.title}#takePhoto] error`, error);
      await this.showAlert('Erro', `Não foi possível tirar a foto [${varname}], tente novamente!`);

      result = null;
    }

    console.log(`[${this.title}#takePhoto] result`, result);
    return new Promise((resolve) => resolve(result));
  }

  async blobToFile(blob: Blob, filename: string, foldername: string, recursive = false): Promise<any> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      console.log(`[${this.title}#blobToFile] --------------------------------------------------`);
      console.log(`[${this.title}#blobToFile] blob`, blob);
      console.log(`[${this.title}#blobToFile] filename`, filename);
      console.log(`[${this.title}#blobToFile] foldername`, foldername);
      // console.log(`[${this.title}#blobToFile] recursive`, recursive);

      try {
        await this.file.checkDir(this.file.dataDirectory, this.HOME_DIR).then(async () => {
          console.log(`[${this.title}#blobToFile] checkDir OK: `, [this.file.dataDirectory, this.HOME_DIR]);

          await this.file.createDir(`${this.file.dataDirectory}${this.HOME_DIR}`, foldername, true).then(async () => {
            console.log(`[${this.title}#blobToFile] createDir [${foldername}] OK: `, [`${this.file.dataDirectory}${this.HOME_DIR}`, foldername, true]);

            await this.file.writeFile(`${this.file.dataDirectory}${this.HOME_DIR}/${foldername}`, filename, blob, { replace: true }).then(async () => {
              console.log(`[${this.title}#blobToFile] writeFile OK: `, [`${this.file.dataDirectory}${this.HOME_DIR}/${foldername}`, filename, blob, { replace: true }]);

              await this.file.checkFile(`${this.file.dataDirectory}${this.HOME_DIR}/${foldername}/`, filename).then(() => {
                console.log(`[${this.title}#blobToFile] checkFile [${filename}] OK: `, [`${this.file.dataDirectory}${this.HOME_DIR}/${foldername}/`, filename]);

                const finalPath = this.file.dataDirectory + `${this.HOME_DIR}/${foldername}/${filename}`;
                console.log(`[${this.title}#blobToFile] finalPath`, finalPath);

                resolve(finalPath);
              });
            });
          });
        });
      } catch (error) {
        console.log(`[${this.title}#blobToFile] ERROR:`, error);

        await this.file.createDir(this.file.dataDirectory, this.HOME_DIR, true).then(async () => {
          console.log(`[${this.title}#blobToFile] createDir [${this.HOME_DIR}] OK`);

          console.log(`[${this.title}#blobToFile] recursive`, recursive);
          if (!recursive) resolve(await this.blobToFile(blob, filename, foldername, true));
        });
      }
    });
  }
}
