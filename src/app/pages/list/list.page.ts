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

  sampleArray: any = [];

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

      this.sampleArray = [
        { int_id: 1, str_nomepessoa: 'John Cristovo', str_placa: 'EDUS4N', str_familia: 'HATCH' },
        { int_id: 2, str_nomepessoa: 'Paul Jose Alves', str_placa: '1337S4N', str_familia: 'SEDAN' },
        { int_id: 3, str_nomepessoa: 'George Rock First', str_placa: 'ED0000', str_familia: 'PICKUP' },
        { int_id: 4, str_nomepessoa: 'Ringo Ornito de Santos', str_placa: 'DUDUSAN', str_familia: 'SUV' },
        { int_id: 5, str_nomepessoa: 'Goku Ferreira da Silva', str_placa: '0071337', str_familia: 'SUV' },
        { int_id: 6, str_nomepessoa: 'Bob Junior Desaparecido', str_placa: 'E1337D', str_familia: 'SEDAN' },
        { int_id: 7, str_nomepessoa: 'Rodrigo Souza Mil Grau', str_placa: 'S4NEDU', str_familia: 'HATCH' },
      ];
      console.log(`[${this.title}#ionViewDidEnter] sampleArray`, this.sampleArray);

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
      if (item.int_id_agendamento?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (`${item.int_id}`?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (item.str_nomepessoa?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (item.str_familia?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
      if (item.str_placa?.toUpperCase().includes(this.query)) {
        this.searchArray.push(item);
        this.auxCount++;
        continue;
      }
    }

    console.log(`[${this.title}#updateQuery] (AFTER) query`, this.query);
    console.log(`[${this.title}#updateQuery] (AFTER) searchArray`, this.searchArray);

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

  async skip() {
    await this.saveAndRedirect({
      int_id: '133742069',
      str_placa: 'TST1337',
      str_nomepessoa: 'Fake Dói José',
      str_familia: 'TIESTE',
      str_celular: '08001337',
      str_email: 'sample@1337.xyz',
      str_observacoes: 'obs000',
      valor: '13.37',
      paymentMethodArray: [
        {
          id: '1',
          alias: 'DINHEIRO'
        },
        {
          id: '2',
          alias: 'PIX'
        },
        {
          id: '4',
          alias: 'DÉBITO'
        }
      ]
    });
  }

  async saveAndRedirect(item: any): Promise<void> {
    console.log(`[${this.title}#saveAndRedirect] item:`, item, 'listarMode:', this.listarMode);

    await this.app.db.setVar('checklistParams', {
      int_id: item.int_id,
      str_placa: item.str_placa,
      str_nomepessoa: item.str_nomepessoa || item.str_nome,
      str_familia: item.str_familia || item.str_veiculo,
      str_celular: item.str_celular,
      str_email: item.str_email,
      str_observacoes: item.str_observacoes,
      checklistMode: this.listarMode,
      valor: item.valor,
      paymentMethodArray: this.paymentMethodArray
    }, this.title);

    this.redirectTo('checklist');
  }

  async requestRecepcao(): Promise<void> {
    const int_empresa = this.loginData[0].int_empresa;
    const int_id = this.loginData[0].int_id;

    console.log(`[${this.title}#requestRecepcao] int_empresa:`, int_empresa, 'int_id:', int_id);

    const url = 'http://mpi.spedo.com.br/api/app/buscarAgendamentosAPP.json';
    const body = {
      int_empresa: btoa(int_empresa), //! MTM=
      int_id_usuario: btoa(int_id) //! OTE4
    };
    const headers = {
      'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
    };

    console.log(`[${this.title}#requestRecepcao] url`, url);
    console.log(`[${this.title}#requestRecepcao] headers`, headers);
    console.log(`[${this.title}#requestRecepcao] body`, body);

    this.app.http.setDataSerializer('json');
    await this.app.http.post(url, body, headers)
      .then(response => {
        console.log(`[${this.title}#requestRecepcao] response`, response);
        console.log(`[${this.title}#requestRecepcao] response.data`, JSON.parse(response.data));

        if (JSON.parse(response.data)['status'] == 200) {
          const responseArray = JSON.parse(response.data)['dados'];
          this.totalCount = Object.keys(responseArray).length;
          this.auxCount = this.totalCount;

          console.log(`[${this.title}#requestRecepcao] responseArray`, responseArray);
          this.dataArray = responseArray;
          console.log(`[${this.title}#requestRecepcao] dataArray`, this.dataArray);
        }
        // } else {
        //   this.totalCount = Object.keys(this.sampleArray).length;
        //   this.auxCount = this.totalCount;

        //   this.dataArray = this.sampleArray;
        //   console.log(`[${this.title}#requestRecepcao] dataArray`, this.dataArray);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async requestTecnicoEntregaPagamento(int_status): Promise<void> {
    const int_empresa = this.loginData[0].int_empresa;
    const int_id = this.loginData[0].int_id;

    console.log(`[${this.title}#requestTecnicoEntregaPagamento] int_empresa:`, int_empresa, 'int_id:', int_id);
    console.log(`[${this.title}#requestTecnicoEntregaPagamento] int_status:`, int_status);

    const url = 'http://mpi.spedo.com.br/api/app/buscarInspecaoAPP.json';
    const body = {
      int_empresa: btoa(int_empresa), //! MTM=
      int_id_usuario: btoa(int_id), //! OTE4
      int_status: btoa(int_status)
    };
    const headers = {
      'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
    };

    console.log(`[${this.title}#requestTecnicoEntregaPagamento] url`, url);
    console.log(`[${this.title}#requestTecnicoEntregaPagamento] headers`, headers);
    console.log(`[${this.title}#requestTecnicoEntregaPagamento] body`, body);

    this.app.http.setDataSerializer('json');
    await this.app.http.post(url, body, headers)
      .then(response => {
        console.log(`[${this.title}#requestTecnicoEntregaPagamento] response`, response);
        console.log(`[${this.title}#requestTecnicoEntregaPagamento] response.data`, JSON.parse(response.data));

        if (JSON.parse(response.data)['status'] == 200) {
          if (int_status == 3) {
            const rawPaymentArray = JSON.parse(response.data)['pagamento'];

            const finalPaymentArray = [];
            for (const payment of rawPaymentArray) {
              if (payment.int_ativo == '1') {
                finalPaymentArray.push({
                  id: payment.int_id,
                  alias: payment.str_nome
                });
              }
            }

            this.paymentMethodArray = finalPaymentArray;
            console.log(`[${this.title}#requestTecnicoEntregaPagamento] paymentMethodArray`, this.paymentMethodArray);
          }

          const responseArray = JSON.parse(response.data)['dados'];
          this.totalCount = Object.keys(responseArray).length;
          this.auxCount = this.totalCount;

          console.log(`[${this.title}#requestTecnicoEntregaPagamento] responseArray`, responseArray);
          this.dataArray = responseArray;
          console.log(`[${this.title}#requestTecnicoEntregaPagamento] dataArray`, this.dataArray);
        }
        // } else {
        //   this.totalCount = Object.keys(this.sampleArray).length;
        //   this.auxCount = this.totalCount;

        //   this.dataArray = this.sampleArray;
        //   console.log(`[${this.title}#requestTecnicoEntregaPagamento] dataArray`, this.dataArray);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async requestItems(): Promise<void> {
    console.log(`[${this.title}#requestItems] listarMode`, this.listarMode);

    if (!this.listarMode) return;

    await this.app.startLoading('Carregando...');

    switch (this.listarMode) {
      case 'recepcao':
        await this.requestRecepcao();
        break;
      case 'tecnico':
        await this.requestTecnicoEntregaPagamento(1);
        break;
      case 'entrega':
        await this.requestTecnicoEntregaPagamento(2);
        break;
      case 'pagamento':
        await this.requestTecnicoEntregaPagamento(3);
        break;
    }

    await this.app.stopLoading();
  }
}
