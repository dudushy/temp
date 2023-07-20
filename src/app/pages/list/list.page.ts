/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  title = 'list';

  loginData: any;
  dataArray: any = [];
  paymentMethodArray: any = [];
  totalCount = 0;
  auxCount = 0;
  listarMode: string;

  searchArray: any = [];
  query: any = null;

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

    this.resetListar();

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#ionViewDidEnter/ready]`);

      this.loginData = await this.app.db.query('SELECT * FROM "tb_user" WHERE id = "1"');
      console.log(`[${this.title}#ionViewDidEnter] loginData`, this.loginData);

      this.listarMode = await this.app.db.getVar('listarMode', this.title);
      console.log(`[${this.title}#ionViewDidEnter] listarMode`, this.listarMode);

      await this.requestItems();
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

  resetListar(): void {
    console.log(`[${this.title}#resetListar]`);
    this.dataArray = [];
    this.totalCount = 0;
    this.auxCount = 0;
  }

  doRefresh(event: any): void {
    console.log(`[${this.title}#doRefresh] event`, event);

    this.requestItems();

    setTimeout(() => {
      console.log(`[${this.title}#doRefresh] COMPLETE`);
      event.target.complete();
    }, 2000);
  }

  updateQuery(rawText) {
    console.log(`[${this.title}#updateQuery] (BEFORE) query`, this.query);
    console.log(`[${this.title}#updateQuery] (BEFORE) searchArray`, this.searchArray);

    this.query = rawText.replaceAll(' ', '') == '' ? null : rawText.toUpperCase();

    const rawQuery = document.getElementById('rawQuery') as HTMLInputElement;
    rawQuery.value = this.query;

    this.searchArray = [];

    this.totalCount = Object.keys(this.dataArray).length;
    // this.totalCount = Object.keys(this.sampleArray).length; //! DEBUG
    this.auxCount = 0;

    for (const item of this.dataArray) {
      // for (const item of this.sampleArray) { //! DEBUG
      console.log(`[${this.title}#updateQuery] item`, item);
      if (`${item.int_id}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (`${item.str_placa}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (`${item.str_modelo}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (`${item.str_nome_razao}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (`${item.str_marca}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
    }

    console.log(`[${this.title}#updateQuery] (AFTER) query`, this.query);
    console.log(`[${this.title}#updateQuery] (AFTER) searchArray`, this.searchArray);

    if (this.query == null && this.searchArray.length == 0) this.auxCount = this.totalCount;

    this.updateView();
  }

  clearQuery() {
    console.log(`[${this.title}#clearQuery] (BEFORE) query`, this.query);
    console.log(`[${this.title}#clearQuery] (BEFORE) searchArray`, this.searchArray);

    const rawQuery = document.getElementById('rawQuery') as HTMLInputElement;
    rawQuery.value = '';

    this.query = null;
    this.searchArray = [];
    this.totalCount = Object.keys(this.dataArray).length;
    // this.totalCount = Object.keys(this.sampleArray).length; //! DEBUG
    this.auxCount = this.totalCount;

    console.log(`[${this.title}#clearQuery] (AFTER) query`, this.query);
    console.log(`[${this.title}#clearQuery] (AFTER) searchArray`, this.searchArray);

    this.updateView();
  }

  async saveAndRedirect(item: any): Promise<void> {
    console.log(`[${this.title}#saveAndRedirect] item:`, item, 'listarMode:', this.listarMode);

    await this.app.db.setVar('checklistParams', {
      checklistMode: this.listarMode,

      int_id: item.int_id,
      str_numero_os: item.str_numero_os,
      str_tipo: item.str_tipo,
      dt_os: item.dt_os,
      str_portas: item.str_portas,
      str_emitir_apolice_garantia: item.str_emitir_apolice_garantia,
      str_tom: item.str_tom,
      int_id_concessionaria: item.int_id_concessionaria,
      str_email: item.str_email,
      int_id_vendedor: item.int_id_vendedor,
      int_tipo_pessoa: item.int_tipo_pessoa,
      int_cpfcnpj: item.int_cpfcnpj,
      str_nome_razao: item.str_nome_razao,
      str_endereco: item.str_endereco,
      str_numero: item.str_numero,
      str_complemento: item.str_complemento,
      str_cidade: item.str_cidade,
      str_cep: item.str_cep,
      str_bairro: item.str_bairro,
      str_email_cliente: item.str_email_cliente,
      str_comercial: item.str_comercial,
      str_fixo: item.str_fixo,
      str_celular: item.str_celular,
      str_marca: item.str_marca,
      str_modelo: item.str_modelo,
      str_versao: item.str_versao,
      str_cor: item.str_cor,
      str_ano_modelo: item.str_ano_modelo,
      str_placa: item.str_placa,
      str_chassi: item.str_chassi,
      str_km: item.str_km,
      str_tipo_veiculo: item.str_tipo_veiculo,
      int_tipo_cadastro: item.int_tipo_cadastro,
      int_apolice_cpfcnpj: item.int_apolice_cpfcnpj,
      str_apolice_nome_razao: item.str_apolice_nome_razao,
      str_apolice_endereco: item.str_apolice_endereco,
      str_apolice_numero: item.str_apolice_numero,
      str_apolice_complemento: item.str_apolice_complemento,
      str_apolice_cidade: item.str_apolice_cidade,
      str_apolice_cep: item.str_apolice_cep,
      str_apolice_bairro: item.str_apolice_bairro,
      str_apolice_email_cliente: item.str_apolice_email_cliente,
      str_apolice_comercial: item.str_apolice_comercial,
      str_apolice_fixo: item.str_apolice_fixo,
      str_apolice_celular: item.str_apolice_celular,
      str_instalacao_endereco: item.str_instalacao_endereco,
      str_instalacao_numero: item.str_instalacao_numero,
      str_instalacao_complemento: item.str_instalacao_complemento,
      str_instalacao_cidade: item.str_instalacao_cidade,
      str_instalacao_cep: item.str_instalacao_cep,
      str_instalacao_bairro: item.str_instalacao_bairro,
      dt_inclusao: item.dt_inclusao,
      int_id_usuario_i: item.int_id_usuario_i,
      dt_alteracao: item.dt_alteracao,
      int_id_usuario_a: item.int_id_usuario_a,
      int_status: item.int_status,
      int_id_servico: item.int_id_servico,
      int_id_status_servico: item.int_id_status_servico,
      int_id_usuario_servico: item.int_id_usuario_servico,
      dt_ultimo_status_servico: item.dt_ultimo_status_servico,
      int_id_preos: item.int_id_preos,
      int_id_instalador: item.int_id_instalador,
      str_hora: item.str_hora,
      str_nome_condutor: item.str_nome_condutor,
      str_email_condutor: item.str_email_condutor,
      int_status_instalacao: item.int_status_instalacao,
    }, this.title);

    this.redirectTo('checklist');
  }

  async request_buscarInstalacaoAPP(int_tipo_instalacao): Promise<void> {
    const int_empresa = this.loginData[0].int_empresa;
    const int_id = this.loginData[0].int_id;

    console.log(`[${this.title}#request_buscarInstalacaoAPP] int_empresa:`, int_empresa, 'int_id:', int_id);

    const url = 'http://webservice.spedo.com.br/api/supaglass/buscarInstalacaoAPP.json';
    const body = {
      int_empresa: btoa(int_empresa),
      int_id_usuario: btoa(int_id),
      int_tipo_instalacao: btoa(int_tipo_instalacao)
    };
    const headers = {
      'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
    };

    console.log(`[${this.title}#request_buscarInstalacaoAPP] url`, url);
    console.log(`[${this.title}#request_buscarInstalacaoAPP] headers`, headers);
    console.log(`[${this.title}#request_buscarInstalacaoAPP] body`, body);

    this.app.http.setDataSerializer('json');
    await this.app.http.post(url, body, headers)
      .then(response => {
        console.log(`[${this.title}#request_buscarInstalacaoAPP] response`, response);
        console.log(`[${this.title}#request_buscarInstalacaoAPP] response.data`, JSON.parse(response.data));

        if (JSON.parse(response.data)['status'] == 200) {
          const responseArray = JSON.parse(response.data)['dados'];
          this.totalCount = Object.keys(responseArray).length;
          this.auxCount = this.totalCount;

          console.log(`[${this.title}#request_buscarInstalacaoAPP] responseArray`, responseArray);
          this.dataArray = responseArray;
          console.log(`[${this.title}#request_buscarInstalacaoAPP] dataArray`, this.dataArray);
        }
      })
      .catch(error => {
        console.log(`[${this.title}#request_buscarInstalacaoAPP] error`, error);
      });
  }

  async requestItems(): Promise<void> {
    console.log(`[${this.title}#requestItems] listarMode`, this.listarMode);

    if (!this.listarMode) return;

    await this.app.startLoading('Carregando...');

    switch (this.listarMode) {
      case 'inicial':
        await this.request_buscarInstalacaoAPP(0);
        break;
      case 'desmontagem':
        await this.request_buscarInstalacaoAPP(1);
        break;
      case 'montagem':
        await this.request_buscarInstalacaoAPP(2);
        break;
      case 'encerrada':
        await this.request_buscarInstalacaoAPP(3);
        break;
    }

    await this.app.stopLoading();
  }
}
