/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  title = 'test';

  testCameraResult: any = null;
  testRequestResult: any = null;

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

  async testCamera() {
    console.log(`[${this.title}#testCamera] (BEFORE) testCameraResult:`, this.testCameraResult);

    // const result = await this.app.takePhoto('test');
    // console.log(`[${this.title}#testCamera] result:`, result);
    // this.testCameraResult = result;

    const result = await this.app.takePhoto('test', 'blob');
    console.log(`[${this.title}#testCamera] result:`, result);

    const finalPath = await this.app.blobToFile(result, 'test_camera.png', 'test');
    console.log(`[${this.title}#takePhoto] finalPath`, finalPath);

    const win: any = window;
    const safeURL = win.Ionic.WebView.convertFileSrc(finalPath);
    console.log(`[${this.title}#takePhoto] safeURL`, safeURL);

    this.testCameraResult = safeURL + `?temp=${new Date().getTime()}`;
    console.log(`[${this.title}#testCamera] (AFTER) testCameraResult:`, this.testCameraResult);
  }

  async testRequest() {
    console.log(`[${this.title}#testRequest] GET`);

    await this.app.startLoading('Baixando...');

    const url = 'https://random-word-api.vercel.app/api?words=10';
    const headers = {};
    const body = {};

    console.log(`[${this.title}#testRequest] url`, url);
    console.log(`[${this.title}#testRequest] headers`, headers);
    console.log(`[${this.title}#testRequest] body`, body);

    this.app.http.setDataSerializer('json');
    await this.app.http.get(url, body, headers)
      .then(async response => {
        console.log(`[${this.title}#testRequest] response`, response);
        console.log(`[${this.title}#testRequest] response.data`, JSON.parse(response.data));

        this.testRequestResult = JSON.parse(response.data);

        await this.app.stopLoading();
        this.updateView();
      })
      .catch(async error => {
        console.log(`[${this.title}#testRequest] error`, error);

        await this.app.stopLoading();
        this.updateView();
      });
  }
}
