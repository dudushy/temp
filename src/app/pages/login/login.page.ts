/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'login';

  user: any = '';
  password: any = '';
  checkbox_rememberLogin: any = false;
  passwordPeek: any = false;

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

      this.user = '';
      this.password = '';

      const rememberLogin = await this.app.db.getVar('rememberLogin', this.title);
      console.log(`[${this.title}#ionViewDidEnter] rememberLogin`, rememberLogin);

      this.checkbox_rememberLogin = rememberLogin || false;

      if (rememberLogin) {
        this.user = await this.app.db.getVar('login_user', this.title);
        this.password = await this.app.db.getVar('login_password', this.title);

        this.login();
        return;
      }

      const devMode = await this.app.db.getVar('devMode', this.title);
      console.log(`[${this.title}#ionViewDidEnter] devMode`, devMode);

      if (devMode) this.autoFill();

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

  autoFill() {
    console.log(`[${this.title}#autoFill]`);

    this.user = 'adm@adm.com.br';
    this.password = '123';
  }

  async login() {
    console.log(`[${this.title}#login] POST`);

    console.log(`[${this.title}#login] user`, this.user);
    if (this.user == '') { await this.app.showAlert('Login', 'Por favor, insira o e-mail.'); return; }

    console.log(`[${this.title}#login] password`, this.password);
    if (this.password == '') { await this.app.showAlert('Login', 'Por favor, insira a senha.'); return; }

    if (this.user == '1337' && this.password == 'dev') { this.redirectTo('dev'); return; }

    await this.app.startLoading('Logando...');

    // const url = `${await this.db.getVar('BASE_URL', this.title)}/api/app`;
    const url = 'http://webservice.spedo.com.br/api/supaglass/logarAPP.json';
    const headers = {
      'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
    };
    const body = {
      str_email: btoa(this.user),
      str_senha: btoa(this.password)
    };

    console.log(`[${this.title}#login] url`, url);
    console.log(`[${this.title}#login] headers`, headers);
    console.log(`[${this.title}#login] body`, body);

    this.app.http.setDataSerializer('json');
    await this.app.http.post(url, body, headers)
      .then(async response => {
        console.log(`[${this.title}#login] response.data`, JSON.parse(response.data));

        if (JSON.parse(response.data)['status'] != 200) { throw new Error(`status: ${JSON.parse(response.data)['status']}`); }

        const rememberLogin = this.checkbox_rememberLogin;
        console.log(`[${this.title}#login] rememberLogin`, rememberLogin);
        await this.app.db.setVar('rememberLogin', rememberLogin, this.title);

        await this.app.db.setTbUser(JSON.parse(response.data), this.title);

        await this.app.db.setVar('login_user', this.user, this.title);
        await this.app.db.setVar('login_password', this.password, this.title);

        this.app.loggedIn = true;
        await this.app.db.setVar('loggedIn', true, this.title);

        await this.app.stopLoading();

        await this.app.showAlert('Login', 'Logado com sucesso!');
        this.redirectTo('home');

        this.updateView();
      })
      .catch(async error => {
        console.log(`[${this.title}#login] error`, error);

        await this.app.stopLoading();

        await this.app.showAlert('Login', 'Dados incorretos, por favor, tente novamente.');

        this.updateView();
      });
  }

  togglePasswordPeek() {
    console.log(`[${this.title}#togglePasswordPeek] (BEFORE) this.passwordPeek`, this.passwordPeek);

    this.passwordPeek = !this.passwordPeek;

    console.log(`[${this.title}#togglePasswordPeek] (AFTER) this.passwordPeek`, this.passwordPeek);
    this.updateView();
  }

  updateCheckbox(newValue: any) {
    console.log(`[${this.title}#updateCheckbox] newValue`, newValue);

    this.checkbox_rememberLogin = newValue;
    console.log(`[${this.title}#updateCheckbox] checkbox_rememberLogin`, this.checkbox_rememberLogin);

    // this.updateView();
  }
}
