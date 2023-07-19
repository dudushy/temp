/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

// import { HTTP } from '@awesome-cordova-plugins/http/ngx'; //! UNUSED

import { DbService } from 'src/app/services/db/db.service';

import { Platform } from '@ionic/angular';

import { EventsService } from 'src/app/services/events/events.service';

// import { File } from '@awesome-cordova-plugins/file/ngx'; //! UNUSED

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  title = '@sync';

  isSyncing = false;

  constructor(
    private db: DbService,
    public platform: Platform,
    private events: EventsService,
  ) {
    console.log(`[${this.title}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#constructor/ready]`);

      // this.startSync();

      this.events.subscribe('checklist:ready2sync', (data: any) => {
        console.log(`[${this.title}#constructor] EVENT = checklist:ready2sync`, data.time);

        // this.startSync();
      });
    });
  }

  async startSync() {
    //   console.log(`[${this.title}#startSync] STARTED`);

    //   const checklists = await this.db.query('SELECT * FROM "tb_checklist" WHERE sync = "0"');

    //   this.isSyncing = true;

    //   if (checklists) {
    //     for (const checklist of Object.entries(checklists)) {
    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]} (${checklist[1]['checklistMode']})`, checklist[1]);

    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]}.sync`, checklist[1]['sync']);
    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]}.syncFields`, checklist[1]['syncFields']);
    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]}.syncMedia`, checklist[1]['syncMedia']);

    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]}.int_id_recepcao`, checklist[1]['int_id_recepcao']);
    //       let postId = checklist[1]['int_id_recepcao'] || checklist[1]['int_id_agendamento'] || null;
    //       console.log(`[${this.title}#startSync] checklist #${checklist[0]} postId`, postId);

    //       const syncStart = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    //       console.log(`[${this.title}#startSync] syncStart`, syncStart);

    //       const startMS = Date.now();
    //       console.log(`[${this.title}#startSync] startMS`, startMS);

    //       await this.db.insertTbLog({
    //         id_agendamento: postId,
    //         status: 'Sincronizando',
    //         placa: checklist[1]['str_placa'],
    //         data: syncStart,
    //         checklist: checklist[1]['checklistMode'],
    //         mensagem: 'Sincronização iniciada'
    //       }, this.title);

    //       try {
    //         //? syncFields
    //         if (checklist[1]['syncFields'] == 0) {
    //           console.log(`[${this.title}#startSync] @${checklist[0]}{syncFields} START`);

    //           const newUploadChecklistResult = await this.newUploadChecklist(checklist[1], postId);
    //           console.log(`[${this.title}#startSync] newUploadChecklistResult`, newUploadChecklistResult);
    //           if (!newUploadChecklistResult) {
    //             await this.db.insertTbLog({
    //               id_agendamento: postId,
    //               status: 'Erro',
    //               placa: checklist[1]['str_placa'],
    //               data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //               checklist: checklist[1]['checklistMode'],
    //               mensagem: 'newUploadChecklistResult = ' + newUploadChecklistResult
    //             }, this.title);

    //             throw new Error(`newUploadChecklistResult=${newUploadChecklistResult}`);
    //           }

    //           const freshInt_id_recepcao = await this.db.query(`SELECT int_id_recepcao FROM "tb_checklist" WHERE id = "${checklist[1]['id']}"`);
    //           console.log(`[${this.title}#startSync] freshInt_id_recepcao`, freshInt_id_recepcao);
    //           console.log(`[${this.title}#startSync] freshInt_id_recepcao[0].int_id_recepcao`, freshInt_id_recepcao[0].int_id_recepcao);
    //           postId = freshInt_id_recepcao[0].int_id_recepcao;
    //           console.log(`[${this.title}#startSync] checklist #${checklist[0]} postId`, postId);

    //           //* update syncFields
    //           const updateSyncFieldsResult = await this.db.query(`UPDATE "tb_checklist" SET syncFields = 1 WHERE id = "${checklist[1]['id']}"`);
    //           console.log(`[${this.title}#startSync] updateSyncFieldsResult`, updateSyncFieldsResult);
    //           if (!updateSyncFieldsResult) {
    //             await this.db.insertTbLog({
    //               id_agendamento: postId,
    //               status: 'Erro',
    //               placa: checklist[1]['str_placa'],
    //               data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //               checklist: checklist[1]['checklistMode'],
    //               mensagem: 'updateSyncFieldsResult = ' + updateSyncFieldsResult
    //             }, this.title);

    //             throw new Error(`updateSyncFieldsResult=${updateSyncFieldsResult}`);
    //           }

    //           await this.db.insertTbLog({
    //             id_agendamento: postId,
    //             status: 'Sincronizado',
    //             placa: checklist[1]['str_placa'],
    //             data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //             checklist: checklist[1]['checklistMode'],
    //             mensagem: 'campos'
    //           }, this.title);

    //           console.log(`[${this.title}#startSync] @${checklist[0]}{syncFields} END`);
    //         }

    //         //? syncImages
    //         if (checklist[1]['syncImages'] == 0) {
    //           console.log(`[${this.title}#startSync] @${checklist[0]}{syncImages} START`);

    //           const uploadChecklistMediaResult = await this.uploadChecklistMedia({
    //             id: checklist[1]['id'],
    //             int_id_recepcao: postId,
    //             str_placa: checklist[1]['str_placa'],
    //             checklistMode: checklist[1]['checklistMode'],
    //             int_id_agendamento: checklist[1]['int_id_agendamento'],
    //             int_id_usuario: checklist[1]['int_id_usuario'],
    //             int_empresa: checklist[1]['int_empresa'],
    //           }, {
    //             str_pneudireitafoto: checklist[1]['str_pneudireitafoto'],
    //             str_pneuesquerdafoto: checklist[1]['str_pneuesquerdafoto'],
    //             str_fotoestepe: checklist[1]['str_fotoestepe'],
    //             str_fotodianteira: checklist[1]['str_fotodianteira'],
    //             str_fotoesquerda: checklist[1]['str_fotoesquerda'],
    //             str_fotodireita: checklist[1]['str_fotodireita'],
    //             str_fototraseira: checklist[1]['str_fototraseira'],
    //             str_fotocapo: checklist[1]['str_fotocapo'],
    //             str_fotoavariadianteira: checklist[1]['str_fotoavariadianteira'],
    //             str_fotoavariaesquerda: checklist[1]['str_fotoavariaesquerda'],
    //             str_fotoavariadireita: checklist[1]['str_fotoavariadireita'],
    //             str_fotoavariatraseira: checklist[1]['str_fotoavariatraseira'],
    //             str_fotoavariacapo: checklist[1]['str_fotoavariacapo'],
    //             str_fotoadicional1: checklist[1]['str_fotoadicional1'],
    //             str_fotoadicional2: checklist[1]['str_fotoadicional2'],
    //             str_fotoadicional3: checklist[1]['str_fotoadicional3'],
    //             str_fotoassinatura: checklist[1]['str_fotoassinatura'],
    //             str_imagemassinatura: checklist[1]['str_imagemassinatura'],
    //             str_fotopneudianteirodireito: checklist[1]['str_fotopneudianteirodireito'],
    //             str_fotopneudianteiroesquerdo: checklist[1]['str_fotopneudianteiroesquerdo'],
    //             str_fotopneutraseirodireito: checklist[1]['str_fotopneutraseirodireito'],
    //             str_fotopneutraseiroesquerdo: checklist[1]['str_fotopneutraseiroesquerdo'],
    //             str_fotoplaca: checklist[1]['str_fotoplaca']
    //           });
    //           if (!uploadChecklistMediaResult) {
    //             await this.db.insertTbLog({
    //               id_agendamento: postId,
    //               status: 'Erro',
    //               placa: checklist[1]['str_placa'],
    //               data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //               checklist: checklist[1]['checklistMode'],
    //               mensagem: 'uploadChecklistMediaResult = ' + uploadChecklistMediaResult
    //             }, this.title);

    //             throw new Error(`uploadChecklistMediaResult=${uploadChecklistMediaResult}`);
    //           }

    //           //* update syncImages
    //           const updateSyncImagesResult = await this.db.query(`UPDATE "tb_checklist" SET syncImages = 1 WHERE id = "${checklist[1]['id']}"`);
    //           if (!updateSyncImagesResult) {
    //             await this.db.insertTbLog({
    //               id_agendamento: postId,
    //               status: 'Erro',
    //               placa: checklist[1]['str_placa'],
    //               data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //               checklist: checklist[1]['checklistMode'],
    //               mensagem: 'updateSyncImagesResult = ' + updateSyncImagesResult
    //             }, this.title);

    //             throw new Error(`updateSyncImagesResult=${updateSyncImagesResult}`);
    //           }

    //           const localFoldername = `${checklist[1]['str_imagemassinatura']}`.split('/')[0];
    //           console.log(`[${this.title}#startSync] @${checklist[0]}{syncImages} removeRecursively $${localFoldername}`);

    //           this.file.removeRecursively(`${this.file.dataDirectory}MPI_Checklists/`, localFoldername).then(() => {
    //             console.log(`[${this.title}#startSync] @${checklist[0]}{syncImages} removeRecursively $${localFoldername} removed`);
    //           }).catch(async error => {
    //             console.log(`[${this.title}#startSync] @${checklist[0]}{syncImages} removeRecursively $${localFoldername} error`, error);

    //             throw new Error(`[${this.title}#startSync] removeRecursively $${localFoldername} error ${error}`);
    //           });

    //           await this.db.insertTbLog({
    //             id_agendamento: postId,
    //             status: 'Sincronizado',
    //             placa: checklist[1]['str_placa'],
    //             data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //             checklist: checklist[1]['checklistMode'],
    //             mensagem: 'imagens'
    //           }, this.title);

    //           console.log(`[${this.title}#startSync] @${checklist[0]}{syncImages} END`);
    //         }
    //       } catch (error) {
    //         await this.db.insertTbLog({
    //           id_agendamento: postId,
    //           status: 'Erro',
    //           placa: checklist[1]['str_placa'],
    //           data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //           checklist: checklist[1]['checklistMode'],
    //           mensagem: 'Sincronização interrompida | ' + JSON.stringify(error)
    //         }, this.title);

    //         //* update syncAttempts
    //         const updateSyncAttemptsResult = await this.db.query(`UPDATE "tb_checklist" SET syncAttempts = ${checklist[1]['syncAttempts'] + 1} WHERE id = "${checklist[1]['id']}"`);
    //         console.log(`[${this.title}#startSync] updateSyncAttemptsResult`, updateSyncAttemptsResult);
    //         if (!updateSyncAttemptsResult) {
    //           await this.db.insertTbLog({
    //             id_agendamento: postId,
    //             status: 'Erro',
    //             placa: checklist[1]['str_placa'],
    //             data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    //             checklist: checklist[1]['checklistMode'],
    //             mensagem: 'updateSyncAttemptsResult = ' + updateSyncAttemptsResult
    //           }, this.title);
    //         }

    //         continue;
    //       }

    //       await this.finishChecklistSync(checklist, syncStart, startMS, postId);
    //     }
    //   }

    //   this.isSyncing = false;

    //   this.events.publish('sync:finished', {
    //     time: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    //   });

    //   console.log(`[${this.title}#startSync] FINSHED`);
  }

  // async finishChecklistSync(checklist: any, syncStart: any, startMS: any, postId: any) {
  //   const endMS = Date.now();
  //   console.log(`[${this.title}#finishSync] endMS`, endMS);

  //   const syncFinish = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  //   console.log(`[${this.title}#finishSync] syncFinish`, syncFinish);

  //   const syncTime = (endMS - startMS).toString().concat('ms');
  //   console.log(`[${this.title}#finishSync] syncTime`, syncTime);

  //   await this.db.query(`UPDATE "tb_checklist" SET syncAttempts = ${checklist[1].syncAttempts + 1} WHERE id = "${checklist[1].id}"`);

  //   const dbMediaArray = await this.db.query(`SELECT * FROM "tb_sync" WHERE id = ${checklist[1].id} AND sync = 0`);
  //   console.log(`[${this.title}#finishSync] dbMediaArray`, dbMediaArray);
  //   console.log(`[${this.title}#finishSync] dbMediaArray[0]`, dbMediaArray[0]);

  //   let countSyncFields = 0;
  //   let countSyncedFields = 0;

  //   for (const [key, value] of Object.entries(dbMediaArray[0])) {
  //     if (key == 'id') continue;
  //     if (key == 'checklistType') continue;
  //     if (key == 'sync') continue;

  //     // console.log(`[${this.title}#finishSync] key {${key}} | value:`, value);

  //     if (!key.includes('_SYNC') && value == 1) {
  //       countSyncFields++;

  //       // console.log(`[${this.title}#finishSync] countSyncFields`, countSyncFields);
  //       continue;
  //     }

  //     if (key.includes('_SYNC') && dbMediaArray[0][key] == 1) {
  //       countSyncedFields++;

  //       // console.log(`[${this.title}#finishSync] countSyncedFields`, countSyncedFields);
  //       continue;
  //     }
  //   }

  //   console.log(`[${this.title}#finishSync] countSyncFields`, countSyncFields);
  //   console.log(`[${this.title}#finishSync] countSyncedFields`, countSyncedFields);
  //   console.log(`[${this.title}#finishSync] countSyncFields == countSyncedFields`, countSyncFields == countSyncedFields);

  //   if (countSyncFields == countSyncedFields) {
  //     await this.db.query('UPDATE "tb_checklist" SET ' +
  //     'sync = 1,' +
  //     `syncStart = "${syncStart}",` +
  //     `syncFinish = "${syncFinish}",` +
  //     `syncTime = "${syncTime}"` +
  //     `WHERE id = "${checklist[1].id}"`);

  //     await this.db.query(`UPDATE "tb_sync" SET sync = 1 WHERE id = "${checklist[1].id}"`);

  //     await this.db.insertTbLog({
  //       id_agendamento: postId,
  //       status: 'Sincronizado',
  //       placa: checklist[1].str_placa,
  //       data: syncFinish,
  //       checklist: checklist[1].checklistMode,
  //       mensagem: `Sincronização concluída (${syncTime}) @${checklist[1].id}`
  //     }, this.title);
  //   } else {
  //     await this.db.insertTbLog({
  //       id_agendamento: postId,
  //       status: 'Erro',
  //       placa: checklist[1].str_placa,
  //       data: syncFinish,
  //       checklist: checklist[1].checklistMode,
  //       mensagem: `Sincronização incompleta @${checklist[1].id}`
  //     }, this.title);
  //   }
  // }

  // async newUploadChecklist(checklist: any, postId: any) {
  //   let OUTPUT = null;

  //   console.log(`[${this.title}#newUploadChecklist] POST`);

  //   const syncStart = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  //   console.log(`[${this.title}#newUploadChecklist] syncStart`, syncStart);

  //   await this.db.insertTbLog({
  //     id_agendamento: postId,
  //     status: 'Sincronizando',
  //     placa: checklist.str_placa,
  //     data: syncStart,
  //     checklist: checklist.checklistMode,
  //     mensagem: 'campos'
  //   }, this.title);

  //   const startMS = Date.now();
  //   console.log(`[${this.title}#newUploadChecklist] startMS`, startMS);

  //   console.log(`[${this.title}#newUploadChecklist] checklistMode`, checklist.checklistMode);

  //   let url, headers, body;
  //   if (checklist.checklistMode == 'recepcao') {
  //     url = `${await this.db.getVar('BASE_URL', this.title)}/api/app/enviarRecepcao.json`;
  //     headers = {
  //       'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
  //     };
  //     body = {
  //       int_id_empresa: checklist.int_id_empresa || '',
  //       int_id_usuario: checklist.int_id_usuario || '',
  //       int_empresa: checklist.int_empresa || '',
  //       int_id_agendamento: checklist.int_id_agendamento || '',
  //       int_integrado: checklist.int_integrado || '',

  //       str_pneudireitafoto: checklist.str_pneudireitafoto?.split('/')[1] || '',
  //       // str_pneudireitafoto: 'str_pneudireitafoto',
  //       str_pneuesquerdafoto: checklist.str_pneuesquerdafoto?.split('/')[1] || '',
  //       // str_pneuesquerdafoto: 'str_pneuesquerdafoto',
  //       str_fotoestepe: checklist.str_fotoestepe?.split('/')[1] || '',
  //       // str_fotoestepe: 'str_fotoestepe',
  //       str_fotodianteira: checklist.str_fotodianteira?.split('/')[1] || '',
  //       // str_fotodianteira: 'str_fotodianteira',
  //       str_fotoesquerda: checklist.str_fotoesquerda?.split('/')[1] || '',
  //       // str_fotoesquerda: 'str_fotoesquerda',
  //       str_fotodireita: checklist.str_fotodireita?.split('/')[1] || '',
  //       // str_fotodireita: 'str_fotodireita',
  //       str_fototraseira: checklist.str_fototraseira?.split('/')[1] || '',
  //       // str_fototraseira: 'str_fototraseira',
  //       str_fotocapo: checklist.str_fotocapo?.split('/')[1] || '',
  //       // str_fotocapo: 'str_fotocapo',
  //       str_fotoavariadianteira: checklist.str_fotoavariadianteira?.split('/')[1] || '',
  //       // str_fotoavariadianteira: 'str_fotoavariadianteira',
  //       str_fotoavariaesquerda: checklist.str_fotoavariaesquerda?.split('/')[1] || '',
  //       // str_fotoavariaesquerda: 'str_fotoavariaesquerda',
  //       str_fotoavariadireita: checklist.str_fotoavariadireita?.split('/')[1] || '',
  //       // str_fotoavariadireita: 'str_fotoavariadireita',
  //       str_fotoavariatraseira: checklist.str_fotoavariatraseira?.split('/')[1] || '',
  //       // str_fotoavariatraseira: 'str_fotoavariatraseira',
  //       str_fotoavariacapo: checklist.str_fotoavariacapo?.split('/')[1] || '',
  //       // str_fotoavariacapo: 'str_fotoavariacapo',
  //       str_fotoadicional1: checklist.str_fotoadicional1?.split('/')[1] || '',
  //       // str_fotoadicional1: 'str_fotoadicional1',
  //       str_fotoadicional2: checklist.str_fotoadicional2?.split('/')[1] || '',
  //       // str_fotoadicional2: 'str_fotoadicional2',
  //       str_fotoadicional3: checklist.str_fotoadicional3?.split('/')[1] || '',
  //       // str_fotoadicional3: 'str_fotoadicional3',
  //       str_fotoassinatura: checklist.str_fotoassinatura?.split('/')[1] || '',
  //       // str_fotoassinatura: 'str_fotoassinatura',
  //       str_imagemassinatura: checklist.str_imagemassinatura?.split('/')[1] || '',
  //       // str_imagemassinatura: 'str_imagemassinatura',

  //       str_fotopneudianteirodireito: checklist.str_fotopneudianteirodireito?.split('/')[1] || '',
  //       str_fotopneudianteiroesquerdo: checklist.str_fotopneudianteiroesquerdo?.split('/')[1] || '',
  //       str_fotopneutraseirodireito: checklist.str_fotopneutraseirodireito?.split('/')[1] || '',
  //       str_fotopneutraseiroesquerdo: checklist.str_fotopneutraseiroesquerdo?.split('/')[1] || '',

  //       str_pneudianteirodireitobolha: checklist.str_pneudianteirodireitobolha || '',
  //       str_pneudianteirodireitoescama: checklist.str_pneudianteirodireitoescama || '',
  //       str_pneudianteirodireitopsi: checklist.str_pneudianteirodireitopsi || '',
  //       str_pneudianteiroesquerdobolha: checklist.str_pneudianteiroesquerdobolha || '',
  //       str_pneudianteiroesquerdoescama: checklist.str_pneudianteiroesquerdoescama || '',
  //       str_pneudianteiroesquerdopsi: checklist.str_pneudianteiroesquerdopsi || '',
  //       str_pneutraseirodireitobolha: checklist.str_pneutraseirodireitobolha || '',
  //       str_pneutraseirodireitoescama: checklist.str_pneutraseirodireitoescama || '',
  //       str_pneutraseirodireitopsi: checklist.str_pneutraseirodireitopsi || '',
  //       str_pneutraseiroesquerdobolha: checklist.str_pneutraseiroesquerdobolha || '',
  //       str_pneutraseiroesquerdoescama: checklist.str_pneutraseiroesquerdoescama || '',
  //       str_pneutraseiroesquerdopsi: checklist.str_pneutraseiroesquerdopsi || '',

  //       str_nome: checklist.str_nome || '',
  //       str_fone: checklist.str_fone || '',
  //       str_celular: checklist.str_celular || '',
  //       str_placa: checklist.str_placa || '',
  //       str_email: checklist.str_email || '',
  //       str_veiculo: checklist.str_veiculo || '',
  //       str_anofabricacaomodelo: checklist.str_anofabricacaomodelo || '',
  //       str_modelo: checklist.str_modelo || '',
  //       str_cor: checklist.str_cor || '',
  //       str_prisma: checklist.str_prisma || '',
  //       str_servico: checklist.str_servico || '',
  //       str_pacote: checklist.str_pacote || '',
  //       str_sintoma: checklist.str_sintoma || '',
  //       str_combustivel: checklist.str_combustivel || '',
  //       str_tipocombustivel: checklist.str_tipocombustivel || '',
  //       str_km: checklist.str_km || '',
  //       str_adocumento: checklist.str_adocumento || '',
  //       str_outrosesquerda: checklist.str_outrosesquerda || '',
  //       str_abanco: checklist.str_abanco || '',
  //       str_aforracoes: checklist.str_aforracoes || '',
  //       str_acarpetes: checklist.str_acarpetes || '',
  //       str_amanuais: checklist.str_amanuais || '',
  //       str_atapetes: checklist.str_atapetes || '',
  //       str_radio: checklist.str_radio || '',
  //       str_acendedor: checklist.str_acendedor || '',
  //       str_calota: checklist.str_calota || '',
  //       str_gps: checklist.str_gps || '',
  //       str_antena: checklist.str_antena || '',
  //       str_pendrive: checklist.str_pendrive || '',
  //       str_roda: checklist.str_roda || '',
  //       str_aoutros: checklist.str_aoutros || '',
  //       str_atextooutros: checklist.str_atextooutros || '',
  //       str_macaco: checklist.str_macaco || '',
  //       str_triangulo: checklist.str_triangulo || '',
  //       str_chavederoda: checklist.str_chavederoda || '',
  //       str_tipo: checklist.str_tipo || '',

  //       str_pneus: checklist.str_pneus || '',
  //       str_estepe: checklist.str_estepe || '',
  //       str_psiestepe: checklist.str_psiestepe || '',
  //       str_pneuestepetamanho: checklist.str_pneuestepetamanho || '',
  //       str_pneuestepemarca: checklist.str_pneuestepemarca || '',
  //       str_pneuestepesulco: checklist.str_pneuestepesulco || '',
  //       str_pneudianteirodireitotamanho: checklist.str_pneudianteirodireitotamanho || '',
  //       str_pneudianteirodireitomarca: checklist.str_pneudianteirodireitomarca || '',
  //       str_pneudianteirodireitosulco: checklist.str_pneudianteirodireitosulco || '',
  //       str_pneutraseirodireitotamanho: checklist.str_pneutraseirodireitotamanho || '',
  //       str_pneutraseirodireitomarca: checklist.str_pneutraseirodireitomarca || '',
  //       str_pneutraseirodireitosulco: checklist.str_pneutraseirodireitosulco || '',
  //       str_pneudianteiroesquerdotamanho: checklist.str_pneudianteiroesquerdotamanho || '',
  //       str_pneudianteiroesquerdomarca: checklist.str_pneudianteiroesquerdomarca || '',
  //       str_pneudianteiroesquerdosulco: checklist.str_pneudianteiroesquerdosulco || '',
  //       str_pneutraseiroesquerdotamanho: checklist.str_pneutraseiroesquerdotamanho || '',
  //       str_pneutraseiroesquerdomarca: checklist.str_pneutraseiroesquerdomarca || '',
  //       str_pneutraseiroesquerdosulco: checklist.str_pneutraseiroesquerdosulco || '',

  //       str_observacao_lado_1: checklist.str_observacao_lado_1 || '',
  //       str_observacao_lado_2: checklist.str_observacao_lado_2 || '',
  //       str_observacoes: checklist.str_observacoes || '',
  //       str_statusmecanico: checklist.str_statusmecanico || '',
  //       str_antenateto: checklist.str_antenateto || '',
  //       str_aspectopintura: checklist.str_aspectopintura || '',
  //       str_bagageiro: checklist.str_bagageiro || '',
  //       str_farois: checklist.str_farois || '',
  //       str_frisoslaterais: checklist.str_frisoslaterais || '',
  //       str_lanternas: checklist.str_lanternas || '',
  //       str_portas: checklist.str_portas || '',
  //       str_rodascalotas: checklist.str_rodascalotas || '',
  //       str_percepcaodeuso1: checklist.str_percepcaodeuso1 || '',
  //       str_antenainterna: checklist.str_antenainterna || '',
  //       str_bancosdianteiros: checklist.str_bancosdianteiros || '',
  //       str_bancostraseiros: checklist.str_bancostraseiros || '',
  //       str_comutadores: checklist.str_comutadores || '',
  //       str_contemsom: checklist.str_contemsom || '',
  //       str_direcao: checklist.str_direcao || '',
  //       str_sinaisdecrianca: checklist.str_sinaisdecrianca || '',
  //       str_sinaiseodorescigarro: checklist.str_sinaiseodorescigarro || '',
  //       str_sistemadeacionamentoeletrico: checklist.str_sistemadeacionamentoeletrico || '',
  //       str_usodecelular: checklist.str_usodecelular || '',
  //       str_percepcaodeuso2: checklist.str_percepcaodeuso2 || '',
  //       str_escapamento: checklist.str_escapamento || '',
  //       str_estriboslaterais: checklist.str_estriboslaterais || '',
  //       str_protetordecarter: checklist.str_protetordecarter || '',
  //       str_rodas: checklist.str_rodas || '',
  //       str_sinaisdeimpacto: checklist.str_sinaisdeimpacto || '',
  //       str_suspensaocoifas: checklist.str_suspensaocoifas || '',
  //       str_vazamentos: checklist.str_vazamentos || '',
  //       str_percepcaodeuso3: checklist.str_percepcaodeuso3 || '',
  //       str_polimento: checklist.str_polimento || '',
  //       str_cristalizacao: checklist.str_cristalizacao || '',
  //       str_pintura: checklist.str_pintura || '',
  //       str_pinturaparachoque: checklist.str_pinturaparachoque || '',
  //       str_chapa: checklist.str_chapa || '',
  //       str_coordenadaamassado1: checklist.str_coordenadaamassado1 || '',
  //       str_coordenadariscado1: checklist.str_coordenadariscado1 || '',
  //       str_coordenadaquebrado1: checklist.str_coordenadaquebrado1 || '',
  //       str_coordenadafaltante1: checklist.str_coordenadafaltante1 || '',
  //       str_coordenadaamassado2: checklist.str_coordenadaamassado2 || '',
  //       str_coordenadariscado2: checklist.str_coordenadariscado2 || '',
  //       str_coordenadaquebrado2: checklist.str_coordenadaquebrado2 || '',
  //       str_coordenadafaltante2: checklist.str_coordenadafaltante2 || ''
  //     };
  //   } else {
  //     url = `${await this.db.getVar('BASE_URL', this.title)}/api/app/enviarAtualizacaoInspecao`;
  //     headers = {
  //       'SPEDO-API-KEY': 'SUPAGd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
  //     };
  //     body = {
  //       int_id_recepcao: checklist.int_id_agendamento || '',
  //       str_tipo: checklist.checklistMode || '',

  //       int_id_empresa: checklist.int_id_empresa || '',
  //       int_id_usuario: checklist.int_id_usuario || '',
  //       int_empresa: checklist.int_empresa || '',
  //       int_id_agendamento: checklist.int_id_agendamento || '',
  //       int_integrado: checklist.int_integrado || '',

  //       int_solicitou_realizado: checklist.int_solicitou_realizado || '',
  //       int_orcamento_complementar: checklist.int_orcamento_complementar || '',
  //       int_futura_necessidade: checklist.int_futura_necessidade || '',
  //       str_futura_necessidade: checklist.str_futura_necessidade || '',

  //       int_solicitou_executado: checklist.int_solicitou_executado || '',
  //       int_apresentacao_orcamento_complementar: checklist.int_apresentacao_orcamento_complementar || '',
  //       int_aprovado_orcamento_complementar: checklist.int_aprovado_orcamento_complementar || '',
  //       int_veiculo_testado: checklist.int_veiculo_testado || '',
  //       int_veiculo_prontoentrega: checklist.int_veiculo_prontoentrega || '',

  //       // valor: checklist.valor || '',
  //       int_id_forma_pagamento: checklist.formaPagamento || ''
  //     };
  //   }

  //   console.log(`[${this.title}#newUploadChecklist] url`, url);
  //   console.log(`[${this.title}#newUploadChecklist] headers`, headers);
  //   console.log(`[${this.title}#newUploadChecklist] body`, body);

  //   this.http.setDataSerializer('json');
  //   await this.http.post(url, body, headers)
  //     .then(async response => {
  //       // //* update syncFields
  //       // const updateSyncFieldsResult = await this.db.query(`UPDATE "tb_checklist" SET syncFields = 1 WHERE id = "${checklist.id}"`);
  //       // if (!updateSyncFieldsResult) throw new Error(`[${this.title}#uploadChecklist] updateSyncFieldsResult: ${updateSyncFieldsResult}`);

  //       // await this.db.insertTbLog({
  //       //   id_agendamento: int_id_recepcao,
  //       //   status: 'Sincronizado',
  //       //   placa: checklist.str_placa,
  //       //   data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //       //   checklist: checklist.checklistMode,
  //       //   mensagem: 'campos'
  //       // }, this.title);

  //       console.log(`[${this.title}#newUploadChecklist] response`, response);
  //       console.log(`[${this.title}#newUploadChecklist] response.data`, JSON.parse(response.data));

  //       // const status = JSON.parse(response.data).status;
  //       // console.log(`[${this.title}#newUploadChecklist] status`, status);

  //       // if (status != 100) throw new Error(`[${this.title}#newUploadChecklist] Status: ${status}`); //? 200

  //       if (checklist.checklistMode == 'recepcao') {
  //         //* update int_id_recepcao
  //         const int_id_recepcao = JSON.parse(response.data).int_id_recepcao;
  //         console.log(`[${this.title}#newUploadChecklist] int_id_recepcao`, int_id_recepcao);

  //         const updateIdInspecaoResult = await this.db.query(`UPDATE "tb_checklist" SET int_id_recepcao = "${int_id_recepcao}" WHERE id = "${checklist.id}"`);
  //         console.log(`[${this.title}#newUploadChecklist] updateIdInspecaoResult`, updateIdInspecaoResult);
  //         if (!updateIdInspecaoResult) throw new Error(`[${this.title}#newUploadChecklist] updateIdInspecaoResult: ${updateIdInspecaoResult}`);
  //       // } else if (checklist.checklistMode != 'pagamento') {
  //       } else {
  //         //* update int_id_recepcao
  //         const int_id_recepcao = JSON.parse(response.data).id;
  //         console.log(`[${this.title}#newUploadChecklist] int_id_recepcao`, int_id_recepcao);

  //         const updateIdInspecaoResult = await this.db.query(`UPDATE "tb_checklist" SET int_id_recepcao = "${int_id_recepcao}" WHERE id = "${checklist.id}"`);
  //         console.log(`[${this.title}#newUploadChecklist] updateIdInspecaoResult`, updateIdInspecaoResult);
  //         if (!updateIdInspecaoResult) throw new Error(`[${this.title}#newUploadChecklist] updateIdInspecaoResult: ${updateIdInspecaoResult}`);

  //         const valor = JSON.parse(response.data).valor;
  //         console.log(`[${this.title}#newUploadChecklist] valor`, valor);

  //         const updateValorResult = await this.db.query(`UPDATE "tb_checklist" SET valor = '${valor}' WHERE id = "${checklist.id}"`);
  //         if (!updateValorResult) throw new Error(`[${this.title}#newUploadChecklist] updateValorResult: ${updateValorResult}`);
  //       }

  //       OUTPUT = true;
  //     })
  //     .catch(async error => {
  //       console.log(`[${this.title}#newUploadChecklist] error`, error);

  //       await this.db.insertTbLog({
  //         id_agendamento: postId,
  //         status: 'Erro',
  //         placa: checklist.str_placa,
  //         data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //         checklist: checklist.checklistMode,
  //         mensagem: 'campos | ' + JSON.stringify(error)
  //       }, this.title);

  //       OUTPUT = false;
  //     });

  //   console.log(`[${this.title}#newUploadChecklist] OUTPUT`, OUTPUT);
  //   return await new Promise(resolve => resolve(OUTPUT));
  // }

  // async uploadChecklistMedia(bodyArray: any, mediaArray: any): Promise<any> {
  //   let OUTPUT = null;

  //   console.log(`[${this.title}#uploadChecklistMedia] bodyArray`, bodyArray);

  //   console.log(`[${this.title}#uploadChecklistMedia] mediaArray`, mediaArray);

  //   await this.db.insertTbLog({
  //     id_agendamento: bodyArray.int_id_recepcao,
  //     status: 'Sincronizando',
  //     placa: bodyArray.str_placa,
  //     data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //     checklist: bodyArray.checklistMode,
  //     mensagem: 'imagens'
  //   }, this.title);

  //   for (const [key, value] of Object.entries(mediaArray)) {
  //     try {
  //       if (!value) {
  //         console.log(`[${this.title}#uploadChecklistMedia] ${key} skipped`, value);
  //         continue;
  //       }

  //       const isKeySynced = await this.db.query(`SELECT ${key}_SYNC FROM "tb_sync" WHERE id = ${bodyArray.id} AND ${key} = 1`);
  //       console.log(`[${this.title}#uploadChecklistMedia] isKeySynced`, isKeySynced);
  //       console.log(`[${this.title}#uploadChecklistMedia] isKeySynced[0].${key}_SYNC`, isKeySynced[0][key + '_SYNC']);

  //       if (isKeySynced[0][key + '_SYNC'] == 1) {
  //         console.log(`[${this.title}#uploadChecklistMedia] ${key} skipped`, isKeySynced[0]);
  //         OUTPUT = true;
  //         continue;
  //       }

  //       await this.db.insertTbLog({
  //         id_agendamento: bodyArray.int_id_recepcao,
  //         status: 'Sincronizando',
  //         placa: bodyArray.str_placa,
  //         data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //         checklist: bodyArray.checklistMode,
  //         mensagem: 'imagens - ' + key
  //       }, this.title);

  //       const postFilename = `${bodyArray.int_id_recepcao}-${bodyArray.checklistMode}-${key}.png`;
  //       console.log(`[${this.title}#uploadChecklistMedia] postFilename`, postFilename);

  //       const localFoldername = `${value}`.split('/')[0];
  //       console.log(`[${this.title}#uploadChecklistMedia] localFoldername`, localFoldername);

  //       const localFilename = `${value}`.split('/')[1];
  //       console.log(`[${this.title}#uploadChecklistMedia] localFilename`, localFilename);

  //       const arrayBuffer = await this.file.readAsArrayBuffer(`${this.file.dataDirectory}MPI_Checklists/${localFoldername}/`, localFilename).then(arrayBuffer => { return arrayBuffer; });
  //       console.log(`[${this.title}#uploadChecklistMedia] arrayBuffer`, arrayBuffer);

  //       const blob = new Blob([arrayBuffer], { type: 'image/png' });
  //       console.log(`[${this.title}#uploadChecklistMedia] blob`, blob);

  //       console.log(`[${this.title}#uploadChecklistMedia] POST`);

  //       const syncStart = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  //       console.log(`[${this.title}#uploadChecklistMedia] syncStart`, syncStart);

  //       const startMS = Date.now();
  //       console.log(`[${this.title}#uploadChecklistMedia] startMS`, startMS);

  //       const url = `${await this.db.getVar('BASE_URL', this.title)}/api/imagem/uploadFiles.json`;
  //       // const url = 'http://webservice.spedo.com.br/api/imagem/uploadFiles';
  //       const headers = {
  //         'UNION-API-KEY': 'W1GZNd|9.eg~PbX-a-lZ{?IZ-W.jMvCP?=K>}Csu'
  //       };
  //       const body = new FormData();
  //       body.append('int_id', bodyArray.int_id_agendamento);
  //       body.append('int_id_inspecao', bodyArray.int_id_recepcao);
  //       body.append('int_id_usuario', bodyArray.int_id_usuario);
  //       body.append('int_id_empresa', bodyArray.int_empresa);
  //       body.append('str_nomeimagem', postFilename);
  //       body.append('str_tipo', bodyArray.checklistMode);
  //       body.append('str_descricao', bodyArray.checklistMode);
  //       body.append('file', blob, postFilename);

  //       console.log(`[${this.title}#uploadChecklistMedia] url`, url);
  //       console.log(`[${this.title}#uploadChecklistMedia] headers`, headers);
  //       console.log(`[${this.title}#uploadChecklistMedia] body`, body);

  //       this.http.setDataSerializer('multipart');
  //       await this.http.post(url, body, headers)
  //         .then(async response => {
  //           console.log(`[${this.title}#uploadChecklistMedia] response`, response);
  //           console.log(`[${this.title}#uploadChecklistMedia] response.data`, JSON.parse(response.data));

  //           const syncFinish = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  //           console.log(`[${this.title}#uploadChecklistMedia] syncFinish`, syncFinish);

  //           const endMS = Date.now();
  //           console.log(`[${this.title}#uploadChecklistMedia] endMS`, endMS);

  //           const syncTime = (endMS - startMS).toString().concat('ms');
  //           console.log(`[${this.title}#uploadChecklistMedia] syncTime`, syncTime);

  //           const status = JSON.parse(response.data).status;
  //           console.log(`[${this.title}#uploadChecklistMedia] status`, status);

  //           if (status != 200) throw new Error(`status: ${status}`);

  //           const updateSyncImagesResult = await this.db.query(`UPDATE "tb_checklist" SET ${key} = "http://mpi.spedo.com.br/filesMPI/${postFilename}" WHERE id = "${bodyArray.id}"`);
  //           if (!updateSyncImagesResult) throw new Error(`[${this.title}#uploadChecklist] updateSyncImagesResult: ${updateSyncImagesResult}`);

  //           //* update checklistImagesSync key
  //           const updateChecklistImageSyncKeyResult = await this.db.query(`UPDATE "tb_sync" SET ${key}_SYNC = 1 WHERE id = "${bodyArray.id}"`);
  //           console.log(`[${this.title}#uploadChecklistMedia] updateChecklistImageSyncKeyResult`, updateChecklistImageSyncKeyResult);
  //           if (!updateChecklistImageSyncKeyResult) throw new Error(`[${this.title}#uploadChecklistMedia] updateChecklistImageSyncKeyResult: ${updateChecklistImageSyncKeyResult}`);

  //           await this.db.insertTbLog({
  //             id_agendamento: bodyArray.int_id_recepcao,
  //             status: 'Sincronizado',
  //             placa: bodyArray.str_placa,
  //             data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //             checklist: bodyArray.checklistMode,
  //             mensagem: 'imagens - ' + key + `(${syncTime})`
  //           }, this.title);

  //           OUTPUT = true;
  //         })
  //         .catch(async error => { throw new Error(JSON.stringify(error)); });
  //     } catch (error) {
  //       console.log(`[${this.title}#uploadChecklistMedia] error`, error);

  //       await this.db.insertTbLog({
  //         id_agendamento: bodyArray.int_id_recepcao,
  //         status: 'Erro',
  //         placa: bodyArray.str_placa,
  //         data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //         checklist: bodyArray.checklistMode,
  //         mensagem: 'imagens - ' + key + ' | ' + JSON.stringify(error)
  //       }, this.title);

  //       OUTPUT = false;
  //       break;
  //     }
  //   }

  //   console.log(`[${this.title}#uploadChecklistMedia] OUTPUT`, OUTPUT);
  //   return await new Promise(resolve => resolve(OUTPUT));
  // }
}
