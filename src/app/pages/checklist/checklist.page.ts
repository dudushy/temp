/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { Platform } from '@ionic/angular';

import SignaturePad from 'signature_pad'; //* signaturePad

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  title = 'checklist';

  //! COMECO
  int_id_empresa: any = null;
  int_id_usuario: any = null;
  int_empresa: any = null;
  int_id_agendamento: any = null;
  int_integrado: any = null;

  str_pneudireitafoto: any = null;
  str_pneuesquerdafoto: any = null;
  str_fotoestepe: any = null;
  str_fotodianteira: any = null;
  str_fotoesquerda: any = null;
  str_fotodireita: any = null;
  str_fototraseira: any = null;
  str_fotocapo: any = null;
  str_fotoavariadianteira: any = null;
  str_fotoavariaesquerda: any = null;
  str_fotoavariadireita: any = null;
  str_fotoavariatraseira: any = null;
  str_fotoavariacapo: any = null;
  str_fotoadicional1: any = null;
  str_fotoadicional2: any = null;
  str_fotoadicional3: any = null;
  str_fotoassinatura: any = null;
  str_imagemassinatura: any = null;

  str_fotopneudianteirodireito: any = null;
  str_fotopneudianteiroesquerdo: any = null;
  str_fotopneutraseirodireito: any = null;
  str_fotopneutraseiroesquerdo: any = null;

  str_fotoplaca: any = null;

  str_pneudianteirodireitobolha: any = null;
  str_pneudianteirodireitoescama: any = null;
  str_pneudianteirodireitopsi: any = null;
  str_pneudianteiroesquerdobolha: any = null;
  str_pneudianteiroesquerdoescama: any = null;
  str_pneudianteiroesquerdopsi: any = null;
  str_pneutraseirodireitobolha: any = null;
  str_pneutraseirodireitoescama: any = null;
  str_pneutraseirodireitopsi: any = null;
  str_pneutraseiroesquerdobolha: any = null;
  str_pneutraseiroesquerdoescama: any = null;
  str_pneutraseiroesquerdopsi: any = null;

  str_nome: any = null;
  str_fone: any = null;
  str_celular: any = null;
  str_placa: any = null;
  str_email: any = null;
  str_veiculo: any = null;
  str_anofabricacaomodelo: any = null;
  str_modelo: any = null;
  str_cor: any = null;
  str_prisma: any = null;
  str_servico: any = null;
  str_pacote: any = null;
  str_sintoma: any = null;
  str_combustivel: any = null;
  str_tipocombustivel: any = null;
  str_km: any = null;
  str_adocumento: any = null;
  str_outrosesquerda: any = null;
  str_abanco: any = null;
  str_aforracoes: any = null;
  str_acarpetes: any = null;
  str_amanuais: any = null;
  str_atapetes: any = null;
  str_radio: any = null;
  str_acendedor: any = null;
  str_calota: any = null;
  str_gps: any = null;
  str_antena: any = null;
  str_pendrive: any = null;
  str_roda: any = null;
  str_aoutros: any = null;
  str_atextooutros: any = null;
  str_macaco: any = null;
  str_triangulo: any = null;
  str_chavederoda: any = null;
  str_tipo: any = null;

  str_pneus: any = null;
  str_estepe: any = null;
  str_psiestepe: any = null;
  str_pneuestepetamanho: any = null;
  str_pneuestepemarca: any = null;
  str_pneuestepesulco: any = null;
  str_pneudianteirodireitotamanho: any = null;
  str_pneudianteirodireitomarca: any = null;
  str_pneudianteirodireitosulco: any = null;
  str_pneutraseirodireitotamanho: any = null;
  str_pneutraseirodireitomarca: any = null;
  str_pneutraseirodireitosulco: any = null;
  str_pneudianteiroesquerdotamanho: any = null;
  str_pneudianteiroesquerdomarca: any = null;
  str_pneudianteiroesquerdosulco: any = null;
  str_pneutraseiroesquerdotamanho: any = null;
  str_pneutraseiroesquerdomarca: any = null;
  str_pneutraseiroesquerdosulco: any = null;

  str_observacao_lado_1: any = null;
  str_observacao_lado_2: any = null;
  str_observacoes: any = null;
  str_statusmecanico: any = null;
  str_antenateto: any = null;
  str_aspectopintura: any = null;
  str_bagageiro: any = null;
  str_farois: any = null;
  str_frisoslaterais: any = null;
  str_lanternas: any = null;
  str_portas: any = null;
  str_rodascalotas: any = null;
  str_percepcaodeuso1: any = null;
  str_antenainterna: any = null;
  str_bancosdianteiros: any = null;
  str_bancostraseiros: any = null;
  str_comutadores: any = null;
  str_contemsom: any = null;
  str_direcao: any = null;
  str_sinaisdecrianca: any = null;
  str_sinaiseodorescigarro: any = null;
  str_sistemadeacionamentoeletrico: any = null;
  str_usodecelular: any = null;
  str_percepcaodeuso2: any = null;
  str_escapamento: any = null;
  str_estriboslaterais: any = null;
  str_protetordecarter: any = null;
  str_rodas: any = null;
  str_sinaisdeimpacto: any = null;
  str_suspensaocoifas: any = null;
  str_vazamentos: any = null;
  str_percepcaodeuso3: any = null;
  str_polimento: any = null;
  str_cristalizacao: any = null;
  str_pintura: any = null;
  str_pinturaparachoque: any = null;
  str_chapa: any = null;
  str_coordenadaamassado1: any = null;
  str_coordenadariscado1: any = null;
  str_coordenadaquebrado1: any = null;
  str_coordenadafaltante1: any = null;
  str_coordenadaamassado2: any = null;
  str_coordenadariscado2: any = null;
  str_coordenadaquebrado2: any = null;
  str_coordenadafaltante2: any = null;

  int_solicitou_realizado: any = null;
  int_orcamento_complementar: any = null;
  int_futura_necessidade: any = null;
  str_futura_necessidade: any = null;

  int_solicitou_executado: any = null;
  int_apresentacao_orcamento_complementar: any = null;
  int_aprovado_orcamento_complementar: any = null;
  int_veiculo_testado: any = null;
  int_veiculo_prontoentrega: any = null;

  valor: any = null;
  formaPagamento: any = null;
  //! FIM

  tireWidth_estepe: any = null;
  tireHeight_estepe: any = null;
  tireRim_estepe: any = null;

  tireWidth_dianteiroDireito: any = null;
  tireHeight_dianteiroDireito: any = null;
  tireRim_dianteiroDireito: any = null;

  tireWidth_dianteiroEsquerdo: any = null;
  tireHeight_dianteiroEsquerdo: any = null;
  tireRim_dianteiroEsquerdo: any = null;

  tireWidth_traseiroDireito: any = null;
  tireHeight_traseiroDireito: any = null;
  tireRim_traseiroDireito: any = null;

  tireWidth_traseiroEsquerdo: any = null;
  tireHeight_traseiroEsquerdo: any = null;
  tireRim_traseiroEsquerdo: any = null;

  tireWidthArray: any = [
    '155',
    '165',
    '600',
    '650',
    '710'
  ];
  tireHeightArray: any = [
    '35',
    '40',
    '45',
    '75'
  ];

  fuelLevelArray: any = [
    '0',
    '1/4',
    '1/2',
    '3/4',
    '4/4'
  ];
  fuelTypeArray: any = {
    gasolina: 'Gasolina',
    diesel: 'Diesel',
    etanol: 'Etanol',
    flex: 'Flex',
    híbrido: 'Híbrido'
  };

  paymentMethodArray: any = [];

  syncedPhotosArray: any = [];

  checklistParams: any = null;
  checklistMode: any = null;
  checklistFutureId: any = null;
  checklistCompleted: any = false;

  accordions: any = [
    'accordion_dadosIniciais',
    'accordion_pneus',
    'accordion_interior',
    'accordion_fotos',
    'accordion_adicionais',
    'accordion_tecnico',
    'accordion_entrega',
    'accordion_pagamento',
    'accordion_assinatura'
  ]
  accordion_dadosIniciais = false;
  accordion_pneus = false;
  accordion_interior = false;
  accordion_fotos = false;
  accordion_adicionais = false;
  accordion_tecnico = false;
  accordion_entrega = false;
  accordion_pagamento = false;
  accordion_assinatura = false;

  signaturePad: SignaturePad; //* signaturePad
  @ViewChild('canvas') canvasEl: ElementRef; //* signaturePad

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

      const loginData = await this.app.db.query('SELECT * FROM "tb_user" WHERE id = "1"');
      console.log(`[${this.title}#ionViewDidEnter] loginData`, loginData);

      this.checklistParams = await this.app.db.getVar('checklistParams', this.title);
      console.log(`[${this.title}#ionViewDidEnter] checklistParams`, this.checklistParams);

      this.checklistMode = this.checklistParams?.checklistMode || null;
      console.log(`[${this.title}#ionViewDidEnter] checklistMode`, this.checklistMode);

      //! COMECO
      this.int_id_empresa = loginData[0]?.int_empresa;
      this.int_id_usuario = loginData[0]?.int_id;
      this.int_empresa = loginData[0]?.int_empresa;
      this.int_id_agendamento = this.checklistParams?.int_id;
      this.int_integrado = null;

      this.str_pneudireitafoto = null;
      this.str_pneuesquerdafoto = null;
      this.str_fotoestepe = null;
      this.str_fotodianteira = null;
      this.str_fotoesquerda = null;
      this.str_fotodireita = null;
      this.str_fototraseira = null;
      this.str_fotocapo = null;
      this.str_fotoavariadianteira = null;
      this.str_fotoavariaesquerda = null;
      this.str_fotoavariadireita = null;
      this.str_fotoavariatraseira = null;
      this.str_fotoavariacapo = null;
      this.str_fotoadicional1 = null;
      this.str_fotoadicional2 = null;
      this.str_fotoadicional3 = null;
      this.str_fotoassinatura = null;
      this.str_imagemassinatura = null;

      this.str_fotopneudianteirodireito = null;
      this.str_fotopneudianteiroesquerdo = null;
      this.str_fotopneutraseirodireito = null;
      this.str_fotopneutraseiroesquerdo = null;

      this.str_fotoplaca = null;

      this.str_pneudianteirodireitobolha = null;
      this.str_pneudianteirodireitoescama = null;
      this.str_pneudianteirodireitopsi = null;
      this.str_pneudianteiroesquerdobolha = null;
      this.str_pneudianteiroesquerdoescama = null;
      this.str_pneudianteiroesquerdopsi = null;
      this.str_pneutraseirodireitobolha = null;
      this.str_pneutraseirodireitoescama = null;
      this.str_pneutraseirodireitopsi = null;
      this.str_pneutraseiroesquerdobolha = null;
      this.str_pneutraseiroesquerdoescama = null;
      this.str_pneutraseiroesquerdopsi = null;

      this.str_nome = this.checklistParams?.str_nomepessoa;
      this.str_fone = null;
      this.str_celular = this.checklistParams?.str_celular;
      this.str_placa = this.checklistParams?.str_placa;
      this.str_email = this.checklistParams?.str_email;
      this.str_veiculo = this.checklistParams?.str_familia;
      this.str_anofabricacaomodelo = null;
      this.str_modelo = null;
      this.str_cor = null;
      this.str_prisma = null;
      this.str_servico = this.checklistParams?.checklistMode;
      this.str_pacote = null;
      this.str_sintoma = this.checklistParams?.str_observacoes;
      this.str_combustivel = null;
      this.str_tipocombustivel = null;
      this.str_km = null;
      this.str_adocumento = null;
      this.str_outrosesquerda = null;
      this.str_abanco = null;
      this.str_aforracoes = null;
      this.str_acarpetes = null;
      this.str_amanuais = null;
      this.str_atapetes = null;
      this.str_radio = null;
      this.str_acendedor = null;
      this.str_calota = null;
      this.str_gps = null;
      this.str_antena = null;
      this.str_pendrive = null;
      this.str_roda = null;
      this.str_aoutros = null;
      this.str_atextooutros = null;
      this.str_macaco = null;
      this.str_triangulo = null;
      this.str_chavederoda = null;
      this.str_tipo = null;

      this.str_pneus = null;
      this.str_estepe = null;
      this.str_psiestepe = null;
      this.str_pneuestepetamanho = null;
      this.str_pneuestepemarca = null;
      this.str_pneuestepesulco = null;
      this.str_pneudianteirodireitotamanho = null;
      this.str_pneudianteirodireitomarca = null;
      this.str_pneudianteirodireitosulco = null;
      this.str_pneutraseirodireitotamanho = null;
      this.str_pneutraseirodireitomarca = null;
      this.str_pneutraseirodireitosulco = null;
      this.str_pneudianteiroesquerdotamanho = null;
      this.str_pneudianteiroesquerdomarca = null;
      this.str_pneudianteiroesquerdosulco = null;
      this.str_pneutraseiroesquerdotamanho = null;
      this.str_pneutraseiroesquerdomarca = null;
      this.str_pneutraseiroesquerdosulco = null;

      this.str_observacao_lado_1 = null;
      this.str_observacao_lado_2 = null;
      this.str_observacoes = null;
      this.str_statusmecanico = null;
      this.str_antenateto = null;
      this.str_aspectopintura = null;
      this.str_bagageiro = null;
      this.str_farois = null;
      this.str_frisoslaterais = null;
      this.str_lanternas = null;
      this.str_portas = null;
      this.str_rodascalotas = null;
      this.str_percepcaodeuso1 = null;
      this.str_antenainterna = null;
      this.str_bancosdianteiros = null;
      this.str_bancostraseiros = null;
      this.str_comutadores = null;
      this.str_contemsom = null;
      this.str_direcao = null;
      this.str_sinaisdecrianca = null;
      this.str_sinaiseodorescigarro = null;
      this.str_sistemadeacionamentoeletrico = null;
      this.str_usodecelular = null;
      this.str_percepcaodeuso2 = null;
      this.str_escapamento = null;
      this.str_estriboslaterais = null;
      this.str_protetordecarter = null;
      this.str_rodas = null;
      this.str_sinaisdeimpacto = null;
      this.str_suspensaocoifas = null;
      this.str_vazamentos = null;
      this.str_percepcaodeuso3 = null;
      this.str_polimento = null;
      this.str_cristalizacao = null;
      this.str_pintura = null;
      this.str_pinturaparachoque = null;
      this.str_chapa = null;
      this.str_coordenadaamassado1 = null;
      this.str_coordenadariscado1 = null;
      this.str_coordenadaquebrado1 = null;
      this.str_coordenadafaltante1 = null;
      this.str_coordenadaamassado2 = null;
      this.str_coordenadariscado2 = null;
      this.str_coordenadaquebrado2 = null;
      this.str_coordenadafaltante2 = null;

      this.int_solicitou_realizado = null;
      this.int_orcamento_complementar = null;
      this.int_futura_necessidade = null;
      this.str_futura_necessidade = null;

      this.int_solicitou_executado = null;
      this.int_apresentacao_orcamento_complementar = null;
      this.int_aprovado_orcamento_complementar = null;
      this.int_veiculo_testado = null;
      this.int_veiculo_prontoentrega = null;

      this.valor = this.checklistParams?.valor;
      this.formaPagamento = null;
      //! FIM

      this.tireWidth_estepe = null;
      this.tireHeight_estepe = null;
      this.tireRim_estepe = null;

      this.tireWidth_dianteiroDireito = null;
      this.tireHeight_dianteiroDireito = null;
      this.tireRim_dianteiroDireito = null;

      this.tireWidth_dianteiroEsquerdo = null;
      this.tireHeight_dianteiroEsquerdo = null;
      this.tireRim_dianteiroEsquerdo = null;

      this.tireWidth_traseiroDireito = null;
      this.tireHeight_traseiroDireito = null;
      this.tireRim_traseiroDireito = null;

      this.tireWidth_traseiroEsquerdo = null;
      this.tireHeight_traseiroEsquerdo = null;
      this.tireRim_traseiroEsquerdo = null;

      this.paymentMethodArray = this.checklistParams?.paymentMethodArray;

      this.syncedPhotosArray = [];

      const lastId = await this.app.db.query('SELECT COUNT(*) FROM "tb_checklist"');
      this.checklistFutureId = lastId[0]['COUNT(*)'] + 1;
      console.log(`[${this.title}#ionViewDidEnter] checklistFutureId`, this.checklistFutureId);

      this.checklistCompleted = false;

      this.accordion_dadosIniciais = false;
      this.accordion_pneus = false;
      this.accordion_interior = false;
      this.accordion_fotos = false;
      this.accordion_adicionais = false;
      this.accordion_tecnico = false;
      this.accordion_entrega = false;
      this.accordion_pagamento = false;
      this.accordion_assinatura = false;

      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement); //* signaturePad

      const canvas = document.querySelector('canvas'); //* signaturePad
      canvas.width = this.app.mobileMode ? window.innerWidth / 1.13 : window.innerWidth / 1.06; //* signaturePad

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

  checkAccordion(accordionId: any) {
    console.log(`[${this.title}#checkAccordion] accordionId`, accordionId);

    if (accordionId == 'accordion_assinatura') {
      this[accordionId] = !this.signaturePad.isEmpty(); //* signaturePad
    } else {
      const accordionElement = document.getElementById(accordionId);
      console.log(`[${this.title}#checkAccordion] accordionElement`, accordionElement);

      const fields = accordionElement.getElementsByClassName('checklistInput');
      console.log(`[${this.title}#checkAccordion] fields`, fields);

      for (const [index, field] of Object.entries(fields)) {
        console.log(`[${this.title}#checkAccordion] index: ${index}`, 'field:', field);

        const fieldId = field.id;
        console.log(`[${this.title}#checkAccordion] fieldId`, fieldId);

        console.log(`[${this.title}#checkAccordion] this[${fieldId}]`, this[fieldId]);

        if (this[fieldId] == null || this[fieldId] == '') {
          this[accordionId] = false;

          break;
        }

        this[accordionId] = true;
      }
    }

    console.log(`[${this.title}#checkAccordion] this[${accordionId}]`, this[accordionId]);

    const activeAccordions = document.getElementsByClassName('checklistAccordion');
    console.log(`[${this.title}#checkAccordion] activeAccordions`, activeAccordions);

    for (const [index, activeAccordion] of Object.entries(activeAccordions)) {
      console.log(`[${this.title}#checkAccordion] index: ${index}`, 'activeAccordion:', activeAccordion);

      const activeAccordionId = activeAccordion.id;
      console.log(`[${this.title}#checkAccordion] activeAccordionId`, activeAccordionId);

      console.log(`[${this.title}#checkAccordion] this[${activeAccordionId}]`, this[activeAccordionId]);

      if (this[activeAccordionId] == false) {
        this.checklistCompleted = false;
        break;
      }

      this.checklistCompleted = true;
    }

    console.log(`[${this.title}#checkAccordion] checklistCompleted`, this.checklistCompleted);
  }

  clearPad() {
    console.log(`[${this.title}#clearPad]`);

    this.signaturePad.clear(); //* signaturePad
  }

  async savePad() {
    console.log(`[${this.title}#savePad]`);

    if (this.signaturePad.isEmpty()) { //* signaturePad
      this.app.showAlert('Assinatura', 'Assinatura em branco, por favor assine!'); //* signaturePad
      return new Promise((resolve) => resolve(false)); //* signaturePad
    }

    // const signature = this.signaturePad.toDataURL();
    // console.log(`[${this.title}#savePad] signature`, signature);

    // this.str_imagemassinatura = signature;
    // this.str_fotoassinatura = signature;

    const signature = this.signaturePad.toDataURL(); //* signaturePad
    console.log(`[${this.title}#savePad] signature`, signature); //* signaturePad

    const blob = await fetch(signature).then(res => res.blob()); //* signaturePad
    console.log(`[${this.title}#savePad] blob`, blob); //* signaturePad

    const finalPath = await this.app.blobToFile(blob, 'str_fotoassinatura.png', `${this.checklistFutureId || '0'}`); //* signaturePad
    console.log(`[${this.title}#savePad] finalPath`, finalPath); //* signaturePad

    const win: any = window; //* signaturePad
    const safeURL = win.Ionic.WebView.convertFileSrc(finalPath); //* signaturePad
    console.log(`[${this.title}#savePad] safeURL`, safeURL); //* signaturePad

    // // this.str_fotoassinatura = safeURL + `?temp=${new Date().getTime()}`; //! DEPRECATED
    this.str_imagemassinatura = safeURL + `?temp=${new Date().getTime()}`; //* signaturePad

    return new Promise((resolve) => resolve(true)); //* signaturePad
  }

  sendPhoto(varname: any) {
    console.log(`[${this.title}#sendPhoto] varname`, varname);
  }

  async takePhoto(varname: any) {
    console.log(`[${this.title}#takePhoto] varname`, varname);

    try {
      await this.app.takePhoto(varname, 'blob').then(async (image) => {
        const finalPath = await this.app.blobToFile(image, `${varname}.png`, `${this.checklistFutureId || '0'}`);
        console.log(`[${this.title}#takePhoto] finalPath`, finalPath);

        const win: any = window;
        const safeURL = win.Ionic.WebView.convertFileSrc(finalPath);
        console.log(`[${this.title}#takePhoto] safeURL`, safeURL);

        this[varname] = safeURL + `?temp=${new Date().getTime()}`;

        console.log(`[${this.title}#takePhoto] (AFTER) this[${varname}]:`, this[varname]);

        this.checkAccordion('accordion_fotos');

        this.updateView();
      });
    } catch (error) {
      console.log(`[${this.title}#takePhoto] error`, error);
      this.app.showAlert('Erro', `Não foi possível tirar a foto [${varname}], tente novamente!`);
    }
  }

  deletePhoto(varname: any) {
    console.log(`[${this.title}#deletePhoto] varname`, varname);

    console.log(`[${this.title}#deletePhoto] (BEFORE) this[${varname}]`, this[varname]);

    this[varname] = null;

    console.log(`[${this.title}#deletePhoto] (AFTER) this[${varname}]`, this[varname]);

    console.log(`[${this.title}#deletePhoto] (BEFORE) syncedPhotosArray`, this.syncedPhotosArray);

    this.syncedPhotosArray = this.syncedPhotosArray.filter(item => item != varname);

    console.log(`[${this.title}#deletePhoto] (AFTER) syncedPhotosArray`, this.syncedPhotosArray);

    this.checkAccordion('accordion_fotos');
    this.checkAccordion('accordion_pneus');

    this.updateView();
  }

  async submitChecklist() {
    console.log(`[${this.title}#submitChecklist]`);

    if (!await this.savePad()) return;

    const checklistFields = {
      int_id_empresa: this.int_id_empresa || null,
      int_id_usuario: this.int_id_usuario || null,
      int_empresa: this.int_empresa || null,
      int_id_agendamento: this.int_id_agendamento || null,
      int_integrado: this.int_integrado || null,

      checklistMode: this.checklistParams?.checklistMode || null,

      str_pneudireitafoto: this.filterImagePath(this.str_pneudireitafoto),
      str_pneuesquerdafoto: this.filterImagePath(this.str_pneuesquerdafoto),
      str_fotoestepe: this.filterImagePath(this.str_fotoestepe),
      str_fotodianteira: this.filterImagePath(this.str_fotodianteira),
      str_fotoesquerda: this.filterImagePath(this.str_fotoesquerda),
      str_fotodireita: this.filterImagePath(this.str_fotodireita),
      str_fototraseira: this.filterImagePath(this.str_fototraseira),
      str_fotocapo: this.filterImagePath(this.str_fotocapo),
      str_fotoavariadianteira: this.filterImagePath(this.str_fotoavariadianteira),
      str_fotoavariaesquerda: this.filterImagePath(this.str_fotoavariaesquerda),
      str_fotoavariadireita: this.filterImagePath(this.str_fotoavariadireita),
      str_fotoavariatraseira: this.filterImagePath(this.str_fotoavariatraseira),
      str_fotoavariacapo: this.filterImagePath(this.str_fotoavariacapo),
      str_fotoadicional1: this.filterImagePath(this.str_fotoadicional1),
      str_fotoadicional2: this.filterImagePath(this.str_fotoadicional2),
      str_fotoadicional3: this.filterImagePath(this.str_fotoadicional3),
      str_fotoassinatura: this.filterImagePath(this.str_fotoassinatura),
      str_imagemassinatura: this.filterImagePath(this.str_imagemassinatura),

      str_fotopneudianteirodireito: this.filterImagePath(this.str_fotopneudianteirodireito),
      str_fotopneudianteiroesquerdo: this.filterImagePath(this.str_fotopneudianteiroesquerdo),
      str_fotopneutraseirodireito: this.filterImagePath(this.str_fotopneutraseirodireito),
      str_fotopneutraseiroesquerdo: this.filterImagePath(this.str_fotopneutraseiroesquerdo),

      str_fotoplaca: this.filterImagePath(this.str_fotoplaca),

      str_pneudianteirodireitobolha: this.str_pneudianteirodireitobolha || null,
      str_pneudianteirodireitoescama: this.str_pneudianteirodireitoescama || null,
      str_pneudianteirodireitopsi: this.str_pneudianteirodireitopsi || null,
      str_pneudianteiroesquerdobolha: this.str_pneudianteiroesquerdobolha || null,
      str_pneudianteiroesquerdoescama: this.str_pneudianteiroesquerdoescama || null,
      str_pneudianteiroesquerdopsi: this.str_pneudianteiroesquerdopsi || null,
      str_pneutraseirodireitobolha: this.str_pneutraseirodireitobolha || null,
      str_pneutraseirodireitoescama: this.str_pneutraseirodireitoescama || null,
      str_pneutraseirodireitopsi: this.str_pneutraseirodireitopsi || null,
      str_pneutraseiroesquerdobolha: this.str_pneutraseiroesquerdobolha || null,
      str_pneutraseiroesquerdoescama: this.str_pneutraseiroesquerdoescama || null,
      str_pneutraseiroesquerdopsi: this.str_pneutraseiroesquerdopsi || null,

      str_nome: this.str_nome || null,
      str_fone: this.str_fone || null,
      str_celular: this.str_celular || null,
      str_placa: this.str_placa || null,
      str_email: this.str_email || null,
      str_veiculo: this.str_veiculo || null,
      str_anofabricacaomodelo: this.str_anofabricacaomodelo || null,
      str_modelo: this.str_modelo || null,
      str_cor: this.str_cor || null,
      str_prisma: this.str_prisma || null,
      str_servico: this.str_servico || null,
      str_pacote: this.str_pacote || null,
      str_sintoma: this.str_sintoma || null,
      str_combustivel: this.str_combustivel || null,
      str_tipocombustivel: this.str_tipocombustivel || null,
      str_km: this.str_km || null,
      str_adocumento: this.str_adocumento || null,
      str_outrosesquerda: this.str_outrosesquerda || null,
      str_abanco: this.str_abanco || null,
      str_aforracoes: this.str_aforracoes || null,
      str_acarpetes: this.str_acarpetes || null,
      str_amanuais: this.str_amanuais || null,
      str_atapetes: this.str_atapetes || null,
      str_radio: this.str_radio || null,
      str_acendedor: this.str_acendedor || null,
      str_calota: this.str_calota || null,
      str_gps: this.str_gps || null,
      str_antena: this.str_antena || null,
      str_pendrive: this.str_pendrive || null,
      str_roda: this.str_roda || null,
      str_aoutros: this.str_aoutros || null,
      str_atextooutros: this.str_atextooutros || null,
      str_macaco: this.str_macaco || null,
      str_triangulo: this.str_triangulo || null,
      str_chavederoda: this.str_chavederoda || null,
      str_tipo: this.str_tipo || null,

      str_pneus: this.str_pneus || null,
      str_estepe: this.str_estepe || null,
      str_psiestepe: this.str_psiestepe || null,
      str_pneuestepetamanho: `${this.tireWidth_estepe} ${this.tireHeight_estepe} ${this.tireRim_estepe}` || null,
      str_pneuestepemarca: this.str_pneuestepemarca || null,
      str_pneuestepesulco: this.str_pneuestepesulco || null,
      str_pneudianteirodireitotamanho: `${this.tireWidth_dianteiroDireito} ${this.tireHeight_dianteiroDireito} ${this.tireRim_dianteiroDireito}` || null,
      str_pneudianteirodireitomarca: this.str_pneudianteirodireitomarca || null,
      str_pneudianteirodireitosulco: this.str_pneudianteirodireitosulco || null,
      str_pneutraseirodireitotamanho: `${this.tireWidth_traseiroDireito} ${this.tireHeight_traseiroDireito} ${this.tireRim_traseiroDireito}` || null,
      str_pneutraseirodireitomarca: this.str_pneutraseirodireitomarca || null,
      str_pneutraseirodireitosulco: this.str_pneutraseirodireitosulco || null,
      str_pneudianteiroesquerdotamanho: `${this.tireWidth_dianteiroEsquerdo} ${this.tireHeight_dianteiroEsquerdo} ${this.tireRim_dianteiroEsquerdo}` || null,
      str_pneudianteiroesquerdomarca: this.str_pneudianteiroesquerdomarca || null,
      str_pneudianteiroesquerdosulco: this.str_pneudianteiroesquerdosulco || null,
      str_pneutraseiroesquerdotamanho: `${this.tireWidth_traseiroEsquerdo} ${this.tireHeight_traseiroEsquerdo} ${this.tireRim_traseiroEsquerdo}` || null,
      str_pneutraseiroesquerdomarca: this.str_pneutraseiroesquerdomarca || null,
      str_pneutraseiroesquerdosulco: this.str_pneutraseiroesquerdosulco || null,

      str_observacao_lado_1: this.str_observacao_lado_1 || null,
      str_observacao_lado_2: this.str_observacao_lado_2 || null,
      str_observacoes: this.str_observacoes || null,
      str_statusmecanico: this.str_statusmecanico || null,
      str_antenateto: this.str_antenateto || null,
      str_aspectopintura: this.str_aspectopintura || null,
      str_bagageiro: this.str_bagageiro || null,
      str_farois: this.str_farois || null,
      str_frisoslaterais: this.str_frisoslaterais || null,
      str_lanternas: this.str_lanternas || null,
      str_portas: this.str_portas || null,
      str_rodascalotas: this.str_rodascalotas || null,
      str_percepcaodeuso1: this.str_percepcaodeuso1 || null,
      str_antenainterna: this.str_antenainterna || null,
      str_bancosdianteiros: this.str_bancosdianteiros || null,
      str_bancostraseiros: this.str_bancostraseiros || null,
      str_comutadores: this.str_comutadores || null,
      str_contemsom: this.str_contemsom || null,
      str_direcao: this.str_direcao || null,
      str_sinaisdecrianca: this.str_sinaisdecrianca || null,
      str_sinaiseodorescigarro: this.str_sinaiseodorescigarro || null,
      str_sistemadeacionamentoeletrico: this.str_sistemadeacionamentoeletrico || null,
      str_usodecelular: this.str_usodecelular || null,
      str_percepcaodeuso2: this.str_percepcaodeuso2 || null,
      str_escapamento: this.str_escapamento || null,
      str_estriboslaterais: this.str_estriboslaterais || null,
      str_protetordecarter: this.str_protetordecarter || null,
      str_rodas: this.str_rodas || null,
      str_sinaisdeimpacto: this.str_sinaisdeimpacto || null,
      str_suspensaocoifas: this.str_suspensaocoifas || null,
      str_vazamentos: this.str_vazamentos || null,
      str_percepcaodeuso3: this.str_percepcaodeuso3 || null,
      str_polimento: this.str_polimento || null,
      str_cristalizacao: this.str_cristalizacao || null,
      str_pintura: this.str_pintura || null,
      str_pinturaparachoque: this.str_pinturaparachoque || null,
      str_chapa: this.str_chapa || null,
      str_coordenadaamassado1: this.str_coordenadaamassado1 || null,
      str_coordenadariscado1: this.str_coordenadariscado1 || null,
      str_coordenadaquebrado1: this.str_coordenadaquebrado1 || null,
      str_coordenadafaltante1: this.str_coordenadafaltante1 || null,
      str_coordenadaamassado2: this.str_coordenadaamassado2 || null,
      str_coordenadariscado2: this.str_coordenadariscado2 || null,
      str_coordenadaquebrado2: this.str_coordenadaquebrado2 || null,
      str_coordenadafaltante2: this.str_coordenadafaltante2 || null,

      int_solicitou_realizado: this.int_solicitou_realizado || null,
      int_orcamento_complementar: this.int_orcamento_complementar || null,
      int_futura_necessidade: this.int_futura_necessidade || null,
      str_futura_necessidade: this.str_futura_necessidade || null,

      int_solicitou_executado: this.int_solicitou_executado || null,
      int_apresentacao_orcamento_complementar: this.int_apresentacao_orcamento_complementar || null,
      int_aprovado_orcamento_complementar: this.int_aprovado_orcamento_complementar || null,
      int_veiculo_testado: this.int_veiculo_testado || null,
      int_veiculo_prontoentrega: this.int_veiculo_prontoentrega || null,

      valor: this.valor || null,
      formaPagamento: this.paymentMethodArray ? this.paymentMethodArray[this.formaPagamento]?.id : null
    };
    console.log(`[${this.title}#submitChecklist] checklistFields`, checklistFields);

    const insertChecklistSQLresult = await this.app.db.insertTbChecklist(checklistFields, this.title);
    console.log(`[${this.title}#submitChecklist] insertChecklistSQLresult`, insertChecklistSQLresult);

    const insertImageSQLresult = await this.app.db.insertTbImage({
      id: this.checklistFutureId,
      checklistType: checklistFields.checklistMode,

      str_pneudireitafoto: checklistFields.str_pneudireitafoto ? 1 : 0,
      str_pneuesquerdafoto: checklistFields.str_pneuesquerdafoto ? 1 : 0,
      str_fotoestepe: checklistFields.str_fotoestepe ? 1 : 0,
      str_fotodianteira: checklistFields.str_fotodianteira ? 1 : 0,
      str_fotoesquerda: checklistFields.str_fotoesquerda ? 1 : 0,
      str_fotodireita: checklistFields.str_fotodireita ? 1 : 0,
      str_fototraseira: checklistFields.str_fototraseira ? 1 : 0,
      str_fotocapo: checklistFields.str_fotocapo ? 1 : 0,
      str_fotoavariadianteira: checklistFields.str_fotoavariadianteira ? 1 : 0,
      str_fotoavariaesquerda: checklistFields.str_fotoavariaesquerda ? 1 : 0,
      str_fotoavariadireita: checklistFields.str_fotoavariadireita ? 1 : 0,
      str_fotoavariatraseira: checklistFields.str_fotoavariatraseira ? 1 : 0,
      str_fotoavariacapo: checklistFields.str_fotoavariacapo ? 1 : 0,
      str_fotoadicional1: checklistFields.str_fotoadicional1 ? 1 : 0,
      str_fotoadicional2: checklistFields.str_fotoadicional2 ? 1 : 0,
      str_fotoadicional3: checklistFields.str_fotoadicional3 ? 1 : 0,
      str_fotoassinatura: checklistFields.str_fotoassinatura ? 1 : 0,
      str_imagemassinatura: checklistFields.str_imagemassinatura ? 1 : 0,
      str_fotopneudianteirodireito: checklistFields.str_fotopneudianteirodireito ? 1 : 0,
      str_fotopneudianteiroesquerdo: checklistFields.str_fotopneudianteiroesquerdo ? 1 : 0,
      str_fotopneutraseirodireito: checklistFields.str_fotopneutraseirodireito ? 1 : 0,
      str_fotopneutraseiroesquerdo: checklistFields.str_fotopneutraseiroesquerdo ? 1 : 0,
      str_fotoplaca: checklistFields.str_fotoplaca ? 1 : 0
    }, this.title);
    console.log(`[${this.title}#submitChecklist] insertImageSQLresult`, insertImageSQLresult);

    if (insertChecklistSQLresult && insertImageSQLresult) this.app.events.publish('checklist:ready2sync', {
      time: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    });

    this.app.showAlert('Checklist', 'Checklist enviado com sucesso!');

    this.redirectTo('menu');
  }

  filterImagePath(imagePath: any) {
    console.log(`[${this.title}#filterImagePath] imagePath`, imagePath);

    try {
      const splited = imagePath?.split('/');
      console.log(`[${this.title}#filterImagePath] splited`, splited);

      const foldername = splited[splited.length - 2];
      console.log(`[${this.title}#filterImagePath] foldername`, foldername);

      const filename = splited[splited.length - 1].split('?temp=')[0];
      console.log(`[${this.title}#filterImagePath] filename`, filename);

      const final = `${foldername}/${filename}`;
      console.log(`[${this.title}#filterImagePath] final`, final);

      return final;
    } catch (error) {
      return null;
    }
  }
}
