/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { File } from '@awesome-cordova-plugins/file/ngx';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  title = 'test';

  constructor(
    public app: AppComponent,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
    public http: HTTP,
    public file: File,
    public camera: Camera,
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

  async takePhoto(varname: any, mode = 'base64') {
    console.log(`[${this.title}#takePhoto] varname`, varname);

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
      console.log(`[${this.title}#takePhoto] JSON(options)`, JSON.stringify(options));

      await this.camera.getPicture(options).then(async (imageData) => {
        console.log(`[${this.title}#takePhoto] (BEFORE) result:`, result);
        console.log(`[${this.title}#takePhoto] imageData`, imageData);
        console.log(`[${this.title}#takePhoto] mode`, mode);

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
      await this.app.showAlert('Erro', `Não foi possível tirar a foto [${varname}], tente novamente!`);

      result = null;
    }

    console.log(`[${this.title}#takePhoto] result`, result);
    return result;
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
        await this.file.checkDir(this.file.dataDirectory, this.app.HOME_DIR).then(async () => {
          console.log(`[${this.title}#blobToFile] checkDir OK: `, [this.file.dataDirectory, this.app.HOME_DIR]);

          await this.file.createDir(`${this.file.dataDirectory}${this.app.HOME_DIR}`, foldername, true).then(async () => {
            console.log(`[${this.title}#blobToFile] createDir [${foldername}] OK: `, [`${this.file.dataDirectory}${this.app.HOME_DIR}`, foldername, true]);

            await this.file.writeFile(`${this.file.dataDirectory}${this.app.HOME_DIR}/${foldername}`, filename, blob, { replace: true }).then(async () => {
              console.log(`[${this.title}#blobToFile] writeFile OK: `, [`${this.file.dataDirectory}${this.app.HOME_DIR}/${foldername}`, filename, blob, { replace: true }]);

              await this.file.checkFile(`${this.file.dataDirectory}${this.app.HOME_DIR}/${foldername}/`, filename).then(() => {
                console.log(`[${this.title}#blobToFile] checkFile [${filename}] OK: `, [`${this.file.dataDirectory}${this.app.HOME_DIR}/${foldername}/`, filename]);

                const finalPath = this.file.dataDirectory + `${this.app.HOME_DIR}/${foldername}/${filename}`;
                console.log(`[${this.title}#blobToFile] finalPath`, finalPath);

                resolve(finalPath);
              });
            });
          });
        });
      } catch (error) {
        console.log(`[${this.title}#blobToFile] ERROR:`, error);

        await this.file.createDir(this.file.dataDirectory, this.app.HOME_DIR, true).then(async () => {
          console.log(`[${this.title}#blobToFile] createDir [${this.app.HOME_DIR}] OK`);

          console.log(`[${this.title}#blobToFile] recursive`, recursive);
          if (!recursive) resolve(await this.blobToFile(blob, filename, foldername, true));
        });
      }
    });
  }
}
