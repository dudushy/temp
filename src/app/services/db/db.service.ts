/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { Platform } from '@ionic/angular';

import { APP_VERSION } from 'src/environments/version';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  title = '@db';

  APP_VERSION = APP_VERSION.replace(/[^0-9]/g, '');
  DB_NAME = 'template';

  constructor(
    private sqlite: SQLite,
    public platform: Platform
  ) {
    console.log(`[${this.title}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#constructor/ready]`);

      // await this.dropTable('vars', this.title); //!DEBUG
      // await this.dropTable('user', this.title); //!DEBUG

      // await this.dropTable('checklist', this.title); //!DEBUG
      // await this.dropTable('sync', this.title); //!DEBUG
      // await this.dropTable('log', this.title); //!DEBUG

      await this.createTbUser();
      await this.createTbVars();

      await this.createTbChecklist();
      await this.createTbSync();
      await this.createTbLog();

      if (await this.getVar('BASE_URL', this.title) == null) await this.setVar('BASE_URL', 'http://webservice.spedo.com.br/api/supaglass/', this.title);

      if (await this.getVar('devMode', this.title) == null) await this.setVar('devMode', false, this.title);

      this.listAllTables();
    });
  }

  async listAllTables() {
    const query = 'SELECT name FROM sqlite_master WHERE type="table" ORDER BY name;';
    // const query = 'SELECT name FROM sqlite_schema WHERE type ="table" AND name NOT LIKE "sqlite_%";';
    console.log(`[${this.title}#listAllTables] query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#listAllTables/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              const result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#listAllTables/db.executeSql]`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#listAllTables/db.executeSql]`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#listAllTables/db.executeSql]`, [query], ` return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#listAllTables/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  async query(query: any): Promise<any> {
    console.log(`[${this.title}#query] query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#query/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              console.log(`[${this.title}#query/db.executeSql]`, [query], ' | data', data);

              const result = [];

              for (let item = 0; item < data.rows.length; item++) {
                console.log(`[${this.title}#query/db.executeSql]`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#query/db.executeSql]`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#query/db.executeSql]`, [query], ` return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#query/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  async dropTable(table: string, from: any): Promise<any> {
    const query = `DROP TABLE IF EXISTS "tb_${table}";`;
    console.log(`[${this.title}#dropTable] {${from}} query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#dropTable/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#dropTable/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#dropTable/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#dropTable/db.executeSql] {${from}} error`, e);
          resolve(false);
        });
    });
  }

  async createTbVars(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_vars"(' +
      'var_name CLOB PRIMARY KEY,' +
      'var_value CLOB' +
      ');';
    console.log(`[${this.title}#createTbVars] query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#createTbVars/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbVars/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbVars/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbVars/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  async setVar(var_name: any, var_value: any, from: any): Promise<any> {
    console.log(`[${this.title}#setVar] {${from}} var_name`, var_name);
    console.log(`[${this.title}#setVar] {${from}} var_value`, var_value);

    // eslint-disable-next-line quotes
    const query = `REPLACE INTO "tb_vars"(` +
      'var_name,' +
      'var_value' +
      ')' +
      'VALUES(' +
      `'${var_name}',` +
      `'${JSON.stringify(var_value)}'` +
      ');';

    console.log(`[${this.title}#setVar] {${from}} query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#setVar/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#setVar/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#setVar/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#setVar/sqlite.create] {${from}} | error`, e);
          resolve(false);
        });
    });
  }

  async getVar(var_name: any, from: any): Promise<any> {
    const query = var_name == '*' ? 'SELECT * FROM "tb_vars"' : `SELECT var_value FROM "tb_vars" WHERE var_name = "${var_name}"`;

    console.log(`[${this.title}#getVar] {${from}} query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#getVar/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              let result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#getVar/db.executeSql] {${from}}`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              if (var_name != '*') {
                result = JSON.parse(result[0].var_value);
              }

              console.log(`[${this.title}#getVar/db.executeSql] {${from}}`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#getVar/db.executeSql] {${from}}`, [query], ` return ${null} | error`, e);

              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#getVar/db.executeSql] {${from}} error`, e);
          resolve(null);
        });
    });
  }

  async createTbUser(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_user"(' +
      'id INTEGER PRIMARY KEY,' +
      'int_id CLOB,' +
      'int_empresa CLOB,' +
      'str_nome CLOB' +
      ');';
    console.log(`[${this.title}#createTbUser] query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#createTbUser/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbUser/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbUser/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbUser/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  async selectTbUser(id: any): Promise<any> {
    const query = id == '*' ? 'SELECT * FROM "tb_user"' : `SELECT * FROM "tb_user" WHERE id = "${id}"`;
    console.log(`[${this.title}#selectTbUser] query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#selectTbUser/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              const result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#selectTbUser/db.executeSql]`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#selectTbUser/db.executeSql]`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#selectTbUser/db.executeSql]`, [query], ` return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#selectTbUser/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  async setTbUser(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#setTbUser] {${from}} itemData`, itemData);

    const query = 'REPLACE INTO "tb_user"(' +
      'id,' +
      'int_id,' +
      'int_empresa,' +
      'str_nome' +
      ')' +
      'VALUES(' +
      '1,' +
      `${itemData.int_id ? '"' + itemData.int_id + '"' : null},` +
      `${itemData.int_empresa ? '"' + itemData.int_empresa + '"' : null},` +
      `${itemData.str_nome ? '"' + itemData.str_nome + '"' : null}` +
      ');';

    console.log(`[${this.title}#setTbUser] {${from}} query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#setTbUser/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#setTbUser/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#setTbUser/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#setTbUser/sqlite.create] {${from}} | error`, e);
          resolve(false);
        });
    });
  }

  async createTbChecklist(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_checklist"(' +
      'id INTEGER PRIMARY KEY,' +

      'sync INTEGER,' +
      'syncAttempts INTEGER,' +
      'syncFields INTEGER,' +
      'syncImages INTEGER,' +
      'syncStart CLOB,' +
      'syncFinish CLOB,' +
      'syncTime CLOB,' +

      'checklistMode CLOB,' +

      'int_id_inspecao INTEGER,' +
      'int_id_usuario INTEGER,' +
      'int_id_empresa INTEGER,' +
      'int_integrado INTEGER,' +
      'int_integrado_upload INTEGER,' +
      'int_status_instalacao CLOB,' +
      'int_numerofotos CLOB,' +

      'str_nomeimagem CLOB,' +
      'str_tipo CLOB,' + //? str_tipo2 CLOB
      'str_descricao CLOB,' +
      'str_imgdados CLOB,' +

      'str_descricaoexterna CLOB,' +
      'str_descricaointerna CLOB,' +
      'str_descricaoportamalas CLOB,' +
      'str_descricaoproblemas CLOB,' +

      'str_imagempneuflash1 CLOB,' +
      'str_imagempneuflash2 CLOB,' +
      'str_imagempneuflash3 CLOB,' +
      'str_imagempneuflash4 CLOB,' +
      'str_imagempneusflash1 CLOB,' +
      'str_imagempneusflash2 CLOB,' +
      'str_imagempneusflash3 CLOB,' +
      'str_imagempneusflash4 CLOB,' +
      'str_imagempneumodelo1 CLOB,' +
      'str_imagempneumodelo2 CLOB,' +
      'str_imagempneumodelo3 CLOB,' +
      'str_imagempneumodelo4 CLOB,' +
      'str_marca1 CLOB,' +
      'str_marca2 CLOB,' +
      'str_marca3 CLOB,' +
      'str_marca4 CLOB,' +
      'str_sulco11 CLOB,' +
      'str_sulco12 CLOB,' +
      'str_sulco13 CLOB,' +
      'str_sulco14 CLOB,' +
      'str_sulco15 CLOB,' +
      'str_sulco21 CLOB,' +
      'str_sulco22 CLOB,' +
      'str_sulco23 CLOB,' +
      'str_sulco24 CLOB,' +
      'str_sulco25 CLOB,' +
      'str_sulco31 CLOB,' +
      'str_sulco32 CLOB,' +
      'str_sulco33 CLOB,' +
      'str_sulco34 CLOB,' +
      'str_sulco35 CLOB,' +
      'str_sulco41 CLOB,' +
      'str_sulco42 CLOB,' +
      'str_sulco43 CLOB,' +
      'str_sulco44 CLOB,' +
      'str_sulco45 CLOB' +
      ');';
    console.log(`[${this.title}#createTbChecklist] query`, [query]);

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#createTbChecklist/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbChecklist/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbChecklist/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbChecklist/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  async selectTbChecklist(id: any): Promise<any> {
    const query = id == '*' ? 'SELECT * FROM "tb_checklist"' : `SELECT * FROM "tb_checklist" WHERE id = "${id}"`;
    console.log(`[${this.title}#selectTbChecklist] query`, [query]);

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#selectTbChecklist/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              const result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#selectTbChecklist/db.executeSql]`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#selectTbChecklist/db.executeSql]`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#selectTbChecklist/db.executeSql]`, [query], ` return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#selectTbChecklist/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  //TODO insertTbChecklist
  async insertTbChecklist(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#insertTbChecklist] {${from}} itemData`, itemData);

    const query = 'INSERT INTO "tb_checklist"(' +

      'int_id_usuario,' +
      'int_empresa,' +
      'int_id_agendamento,' +
      'int_id_recepcao,' +
      'int_integrado,' +

      'sync,' +
      'syncFields,' +
      'syncImages,' +
      'syncStart,' +
      'syncFinish,' +
      'syncTime,' +

      'checklistMode,' +

      'str_pneudireitafoto,' +
      'str_pneuesquerdafoto,' +
      'str_fotoestepe,' +
      'str_fotodianteira,' +
      'str_fotoesquerda,' +
      'str_fotodireita,' +
      'str_fototraseira,' +
      'str_fotocapo,' +
      'str_fotoavariadianteira,' +
      'str_fotoavariaesquerda,' +
      'str_fotoavariadireita,' +
      'str_fotoavariatraseira,' +
      'str_fotoavariacapo,' +
      'str_fotoadicional1,' +
      'str_fotoadicional2,' +
      'str_fotoadicional3,' +
      'str_fotoassinatura,' +
      'str_imagemassinatura,' +

      'str_fotopneudianteirodireito,' +
      'str_fotopneudianteiroesquerdo,' +
      'str_fotopneutraseirodireito,' +
      'str_fotopneutraseiroesquerdo,' +

      'str_fotoplaca,' +

      'str_pneudianteirodireitobolha,' +
      'str_pneudianteirodireitoescama,' +
      'str_pneudianteirodireitopsi,' +
      'str_pneudianteiroesquerdobolha,' +
      'str_pneudianteiroesquerdoescama,' +
      'str_pneudianteiroesquerdopsi,' +
      'str_pneutraseirodireitobolha,' +
      'str_pneutraseirodireitoescama,' +
      'str_pneutraseirodireitopsi,' +
      'str_pneutraseiroesquerdobolha,' +
      'str_pneutraseiroesquerdoescama,' +
      'str_pneutraseiroesquerdopsi,' +

      'str_nome,' +
      'str_fone,' +
      'str_celular,' +
      'str_placa,' +
      'str_email,' +
      'str_veiculo,' +
      'str_anofabricacaomodelo,' +
      'str_modelo,' +
      'str_cor,' +
      'str_prisma,' +
      'str_servico,' +
      'str_pacote,' +
      'str_sintoma,' +
      'str_combustivel,' +
      'str_tipocombustivel,' +
      'str_km,' +
      'str_adocumento,' +
      'str_outrosesquerda,' +
      'str_abanco,' +
      'str_aforracoes,' +
      'str_acarpetes,' +
      'str_amanuais,' +
      'str_atapetes,' +
      'str_radio,' +
      'str_acendedor,' +
      'str_calota,' +
      'str_gps,' +
      'str_antena,' +
      'str_pendrive,' +
      'str_roda,' +
      'str_aoutros,' +
      'str_atextooutros,' +
      'str_macaco,' +
      'str_triangulo,' +
      'str_chavederoda,' +
      'str_tipo,' +

      'str_pneus,' +
      'str_estepe,' +
      'str_psiestepe,' +
      'str_pneuestepetamanho,' +
      'str_pneuestepemarca,' +
      'str_pneuestepesulco,' +
      'str_pneudianteirodireitotamanho,' +
      'str_pneudianteirodireitomarca,' +
      'str_pneudianteirodireitosulco,' +
      'str_pneutraseirodireitotamanho,' +
      'str_pneutraseirodireitomarca,' +
      'str_pneutraseirodireitosulco,' +
      'str_pneudianteiroesquerdotamanho,' +
      'str_pneudianteiroesquerdomarca,' +
      'str_pneudianteiroesquerdosulco,' +
      'str_pneutraseiroesquerdotamanho,' +
      'str_pneutraseiroesquerdomarca,' +
      'str_pneutraseiroesquerdosulco,' +

      'str_observacao_lado_1,' +
      'str_observacao_lado_2,' +
      'str_observacoes,' +
      'str_statusmecanico,' +
      'str_antenateto,' +
      'str_aspectopintura,' +
      'str_bagageiro,' +
      'str_farois,' +
      'str_frisoslaterais,' +
      'str_lanternas,' +
      'str_portas,' +
      'str_rodascalotas,' +
      'str_percepcaodeuso1,' +
      'str_antenainterna,' +
      'str_bancosdianteiros,' +
      'str_bancostraseiros,' +
      'str_comutadores,' +
      'str_contemsom,' +
      'str_direcao,' +
      'str_sinaisdecrianca,' +
      'str_sinaiseodorescigarro,' +
      'str_sistemadeacionamentoeletrico,' +
      'str_usodecelular,' +
      'str_percepcaodeuso2,' +
      'str_escapamento,' +
      'str_estriboslaterais,' +
      'str_rodas,' +
      'str_protetordecarter,' +
      'str_sinaisdeimpacto,' +
      'str_suspensaocoifas,' +
      'str_vazamentos,' +
      'str_percepcaodeuso3,' +
      'str_polimento,' +
      'str_cristalizacao,' +
      'str_pintura,' +
      'str_pinturaparachoque,' +
      'str_chapa,' +
      'str_coordenadaamassado1,' +
      'str_coordenadariscado1,' +
      'str_coordenadaquebrado1,' +
      'str_coordenadafaltante1,' +
      'str_coordenadaamassado2,' +
      'str_coordenadariscado2,' +
      'str_coordenadaquebrado2,' +
      'str_coordenadafaltante2,' +

      'int_solicitou_realizado,' +
      'int_orcamento_complementar,' +
      'int_futura_necessidade,' +
      'str_futura_necessidade,' +

      'int_solicitou_executado,' +
      'int_apresentacao_orcamento_complementar,' +
      'int_aprovado_orcamento_complementar,' +
      'int_veiculo_testado,' +
      'int_veiculo_prontoentrega,' +

      'valor,' +
      'formaPagamento' +
      ')' +
      'VALUES(' +
      `${itemData.int_id_usuario},` +
      `${itemData.int_empresa},` +
      `${itemData.int_id_agendamento},` +
      '0,' +
      `${itemData.int_integrado},` +

      '0,' +
      '0,' +
      '0,' +
      'null,' +
      'null,' +
      'null,' +

      `${itemData.checklistMode ? '"' + itemData.checklistMode + '"' : null},` +

      `${itemData.str_pneudireitafoto ? '"' + itemData.str_pneudireitafoto + '"' : null},` +
      `${itemData.str_pneuesquerdafoto ? '"' + itemData.str_pneuesquerdafoto + '"' : null},` +
      `${itemData.str_fotoestepe ? '"' + itemData.str_fotoestepe + '"' : null},` +
      `${itemData.str_fotodianteira ? '"' + itemData.str_fotodianteira + '"' : null},` +
      `${itemData.str_fotoesquerda ? '"' + itemData.str_fotoesquerda + '"' : null},` +
      `${itemData.str_fotodireita ? '"' + itemData.str_fotodireita + '"' : null},` +
      `${itemData.str_fototraseira ? '"' + itemData.str_fototraseira + '"' : null},` +
      `${itemData.str_fotocapo ? '"' + itemData.str_fotocapo + '"' : null},` +
      `${itemData.str_fotoavariadianteira ? '"' + itemData.str_fotoavariadianteira + '"' : null},` +
      `${itemData.str_fotoavariaesquerda ? '"' + itemData.str_fotoavariaesquerda + '"' : null},` +
      `${itemData.str_fotoavariadireita ? '"' + itemData.str_fotoavariadireita + '"' : null},` +
      `${itemData.str_fotoavariatraseira ? '"' + itemData.str_fotoavariatraseira + '"' : null},` +
      `${itemData.str_fotoavariacapo ? '"' + itemData.str_fotoavariacapo + '"' : null},` +
      `${itemData.str_fotoadicional1 ? '"' + itemData.str_fotoadicional1 + '"' : null},` +
      `${itemData.str_fotoadicional2 ? '"' + itemData.str_fotoadicional2 + '"' : null},` +
      `${itemData.str_fotoadicional3 ? '"' + itemData.str_fotoadicional3 + '"' : null},` +
      `${itemData.str_fotoassinatura ? '"' + itemData.str_fotoassinatura + '"' : null},` +
      `${itemData.str_imagemassinatura ? '"' + itemData.str_imagemassinatura + '"' : null},` +

      `${itemData.str_fotopneudianteirodireito ? '"' + itemData.str_fotopneudianteirodireito + '"' : null},` +
      `${itemData.str_fotopneudianteiroesquerdo ? '"' + itemData.str_fotopneudianteiroesquerdo + '"' : null},` +
      `${itemData.str_fotopneutraseirodireito ? '"' + itemData.str_fotopneutraseirodireito + '"' : null},` +
      `${itemData.str_fotopneutraseiroesquerdo ? '"' + itemData.str_fotopneutraseiroesquerdo + '"' : null},` +

      `${itemData.str_fotoplaca ? '"' + itemData.str_fotoplaca + '"' : null},` +

      `${itemData.str_pneudianteirodireitobolha ? '"' + itemData.str_pneudianteirodireitobolha + '"' : null},` +
      `${itemData.str_pneudianteirodireitoescama ? '"' + itemData.str_pneudianteirodireitoescama + '"' : null},` +
      `${itemData.str_pneudianteirodireitopsi ? '"' + itemData.str_pneudianteirodireitopsi + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdobolha ? '"' + itemData.str_pneudianteiroesquerdobolha + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdoescama ? '"' + itemData.str_pneudianteiroesquerdoescama + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdopsi ? '"' + itemData.str_pneudianteiroesquerdopsi + '"' : null},` +
      `${itemData.str_pneutraseirodireitobolha ? '"' + itemData.str_pneutraseirodireitobolha + '"' : null},` +
      `${itemData.str_pneutraseirodireitoescama ? '"' + itemData.str_pneutraseirodireitoescama + '"' : null},` +
      `${itemData.str_pneutraseirodireitopsi ? '"' + itemData.str_pneutraseirodireitopsi + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdobolha ? '"' + itemData.str_pneutraseiroesquerdobolha + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdoescama ? '"' + itemData.str_pneutraseiroesquerdoescama + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdopsi ? '"' + itemData.str_pneutraseiroesquerdopsi + '"' : null},` +

      `${itemData.str_nome ? '"' + itemData.str_nome + '"' : null},` +
      `${itemData.str_fone ? '"' + itemData.str_fone + '"' : null},` +
      `${itemData.str_celular ? '"' + itemData.str_celular + '"' : null},` +
      `${itemData.str_placa ? '"' + itemData.str_placa + '"' : null},` +
      `${itemData.str_email ? '"' + itemData.str_email + '"' : null},` +
      `${itemData.str_veiculo ? '"' + itemData.str_veiculo + '"' : null},` +
      `${itemData.str_anofabricacaomodelo ? '"' + itemData.str_anofabricacaomodelo + '"' : null},` +
      `${itemData.str_modelo ? '"' + itemData.str_modelo + '"' : null},` +
      `${itemData.str_cor ? '"' + itemData.str_cor + '"' : null},` +
      `${itemData.str_prisma ? '"' + itemData.str_prisma + '"' : null},` +
      `${itemData.str_servico ? '"' + itemData.str_servico + '"' : null},` +
      `${itemData.str_pacote ? '"' + itemData.str_pacote + '"' : null},` +
      `${itemData.str_sintoma ? '"' + itemData.str_sintoma + '"' : null},` +
      `${itemData.str_combustivel ? '"' + itemData.str_combustivel + '"' : null},` +
      `${itemData.str_tipocombustivel ? '"' + itemData.str_tipocombustivel + '"' : null},` +
      `${itemData.str_km ? '"' + itemData.str_km + '"' : null},` +
      `${itemData.str_adocumento ? '"' + itemData.str_adocumento + '"' : null},` +
      `${itemData.str_outrosesquerda ? '"' + itemData.str_outrosesquerda + '"' : null},` +
      `${itemData.str_abanco ? '"' + itemData.str_abanco + '"' : null},` +
      `${itemData.str_aforracoes ? '"' + itemData.str_aforracoes + '"' : null},` +
      `${itemData.str_acarpetes ? '"' + itemData.str_acarpetes + '"' : null},` +
      `${itemData.str_amanuais ? '"' + itemData.str_amanuais + '"' : null},` +
      `${itemData.str_atapetes ? '"' + itemData.str_atapetes + '"' : null},` +
      `${itemData.str_radio ? '"' + itemData.str_radio + '"' : null},` +
      `${itemData.str_acendedor ? '"' + itemData.str_acendedor + '"' : null},` +
      `${itemData.str_calota ? '"' + itemData.str_calota + '"' : null},` +
      `${itemData.str_gps ? '"' + itemData.str_gps + '"' : null},` +
      `${itemData.str_antena ? '"' + itemData.str_antena + '"' : null},` +
      `${itemData.str_pendrive ? '"' + itemData.str_pendrive + '"' : null},` +
      `${itemData.str_roda ? '"' + itemData.str_roda + '"' : null},` +
      `${itemData.str_aoutros ? '"' + itemData.str_aoutros + '"' : null},` +
      `${itemData.str_atextooutros ? '"' + itemData.str_atextooutros + '"' : null},` +
      `${itemData.str_macaco ? '"' + itemData.str_macaco + '"' : null},` +
      `${itemData.str_triangulo ? '"' + itemData.str_triangulo + '"' : null},` +
      `${itemData.str_chavederoda ? '"' + itemData.str_chavederoda + '"' : null},` +
      `${itemData.str_tipo ? '"' + itemData.str_tipo + '"' : null},` +

      `${itemData.str_pneus ? '"' + itemData.str_pneus + '"' : null},` +
      `${itemData.str_estepe ? '"' + itemData.str_estepe + '"' : null},` +
      `${itemData.str_psiestepe ? '"' + itemData.str_psiestepe + '"' : null},` +
      `${itemData.str_pneuestepetamanho ? '"' + itemData.str_pneuestepetamanho + '"' : null},` +
      `${itemData.str_pneuestepemarca ? '"' + itemData.str_pneuestepemarca + '"' : null},` +
      `${itemData.str_pneuestepesulco ? '"' + itemData.str_pneuestepesulco + '"' : null},` +
      `${itemData.str_pneudianteirodireitotamanho ? '"' + itemData.str_pneudianteirodireitotamanho + '"' : null},` +
      `${itemData.str_pneudianteirodireitomarca ? '"' + itemData.str_pneudianteirodireitomarca + '"' : null},` +
      `${itemData.str_pneudianteirodireitosulco ? '"' + itemData.str_pneudianteirodireitosulco + '"' : null},` +
      `${itemData.str_pneutraseirodireitotamanho ? '"' + itemData.str_pneutraseirodireitotamanho + '"' : null},` +
      `${itemData.str_pneutraseirodireitomarca ? '"' + itemData.str_pneutraseirodireitomarca + '"' : null},` +
      `${itemData.str_pneutraseirodireitosulco ? '"' + itemData.str_pneutraseirodireitosulco + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdotamanho ? '"' + itemData.str_pneudianteiroesquerdotamanho + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdomarca ? '"' + itemData.str_pneudianteiroesquerdomarca + '"' : null},` +
      `${itemData.str_pneudianteiroesquerdosulco ? '"' + itemData.str_pneudianteiroesquerdosulco + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdotamanho ? '"' + itemData.str_pneutraseiroesquerdotamanho + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdomarca ? '"' + itemData.str_pneutraseiroesquerdomarca + '"' : null},` +
      `${itemData.str_pneutraseiroesquerdosulco ? '"' + itemData.str_pneutraseiroesquerdosulco + '"' : null},` +

      `${itemData.str_observacao_lado_1 ? '"' + itemData.str_observacao_lado_1 + '"' : null},` +
      `${itemData.str_observacao_lado_2 ? '"' + itemData.str_observacao_lado_2 + '"' : null},` +
      `${itemData.str_observacoes ? '"' + itemData.str_observacoes + '"' : null},` +
      `${itemData.str_statusmecanico ? '"' + itemData.str_statusmecanico + '"' : null},` +
      `${itemData.str_antenateto ? '"' + itemData.str_antenateto + '"' : null},` +
      `${itemData.str_aspectopintura ? '"' + itemData.str_aspectopintura + '"' : null},` +
      `${itemData.str_bagageiro ? '"' + itemData.str_bagageiro + '"' : null},` +
      `${itemData.str_farois ? '"' + itemData.str_farois + '"' : null},` +
      `${itemData.str_frisoslaterais ? '"' + itemData.str_frisoslaterais + '"' : null},` +
      `${itemData.str_lanternas ? '"' + itemData.str_lanternas + '"' : null},` +
      `${itemData.str_portas ? '"' + itemData.str_portas + '"' : null},` +
      `${itemData.str_rodascalotas ? '"' + itemData.str_rodascalotas + '"' : null},` +
      `${itemData.str_percepcaodeuso1 ? '"' + itemData.str_percepcaodeuso1 + '"' : null},` +
      `${itemData.str_antenainterna ? '"' + itemData.str_antenainterna + '"' : null},` +
      `${itemData.str_bancosdianteiros ? '"' + itemData.str_bancosdianteiros + '"' : null},` +
      `${itemData.str_bancostraseiros ? '"' + itemData.str_bancostraseiros + '"' : null},` +
      `${itemData.str_comutadores ? '"' + itemData.str_comutadores + '"' : null},` +
      `${itemData.str_contemsom ? '"' + itemData.str_contemsom + '"' : null},` +
      `${itemData.str_direcao ? '"' + itemData.str_direcao + '"' : null},` +
      `${itemData.str_sinaisdecrianca ? '"' + itemData.str_sinaisdecrianca + '"' : null},` +
      `${itemData.str_sinaiseodorescigarro ? '"' + itemData.str_sinaiseodorescigarro + '"' : null},` +
      `${itemData.str_sistemadeacionamentoeletrico ? '"' + itemData.str_sistemadeacionamentoeletrico + '"' : null},` +
      `${itemData.str_usodecelular ? '"' + itemData.str_usodecelular + '"' : null},` +
      `${itemData.str_percepcaodeuso2 ? '"' + itemData.str_percepcaodeuso2 + '"' : null},` +
      `${itemData.str_escapamento ? '"' + itemData.str_escapamento + '"' : null},` +
      `${itemData.str_estriboslaterais ? '"' + itemData.str_estriboslaterais + '"' : null},` +
      `${itemData.str_protetordecarter ? '"' + itemData.str_protetordecarter + '"' : null},` +
      `${itemData.str_rodas ? '"' + itemData.str_rodas + '"' : null},` +
      `${itemData.str_sinaisdeimpacto ? '"' + itemData.str_sinaisdeimpacto + '"' : null},` +
      `${itemData.str_suspensaocoifas ? '"' + itemData.str_suspensaocoifas + '"' : null},` +
      `${itemData.str_vazamentos ? '"' + itemData.str_vazamentos + '"' : null},` +
      `${itemData.str_percepcaodeuso3 ? '"' + itemData.str_percepcaodeuso3 + '"' : null},` +
      `${itemData.str_polimento ? '"' + itemData.str_polimento + '"' : null},` +
      `${itemData.str_cristalizacao ? '"' + itemData.str_cristalizacao + '"' : null},` +
      `${itemData.str_pintura ? '"' + itemData.str_pintura + '"' : null},` +
      `${itemData.str_pinturaparachoque ? '"' + itemData.str_pinturaparachoque + '"' : null},` +
      `${itemData.str_chapa ? '"' + itemData.str_chapa + '"' : null},` +
      `${itemData.str_coordenadaamassado1 ? '"' + itemData.str_coordenadaamassado1 + '"' : null},` +
      `${itemData.str_coordenadariscado1 ? '"' + itemData.str_coordenadariscado1 + '"' : null},` +
      `${itemData.str_coordenadaquebrado1 ? '"' + itemData.str_coordenadaquebrado1 + '"' : null},` +
      `${itemData.str_coordenadafaltante1 ? '"' + itemData.str_coordenadafaltante1 + '"' : null},` +
      `${itemData.str_coordenadaamassado2 ? '"' + itemData.str_coordenadaamassado2 + '"' : null},` +
      `${itemData.str_coordenadariscado2 ? '"' + itemData.str_coordenadariscado2 + '"' : null},` +
      `${itemData.str_coordenadaquebrado2 ? '"' + itemData.str_coordenadaquebrado2 + '"' : null},` +
      `${itemData.str_coordenadafaltante2 ? '"' + itemData.str_coordenadafaltante2 + '"' : null},` +

      `${itemData.int_solicitou_realizado ? '"' + itemData.int_solicitou_realizado + '"' : null},` +
      `${itemData.int_orcamento_complementar ? '"' + itemData.int_orcamento_complementar + '"' : null},` +
      `${itemData.int_futura_necessidade ? '"' + itemData.int_futura_necessidade + '"' : null},` +
      `${itemData.str_futura_necessidade ? '"' + itemData.str_futura_necessidade + '"' : null},` +

      `${itemData.int_solicitou_executado ? '"' + itemData.int_solicitou_executado + '"' : null},` +
      `${itemData.int_apresentacao_orcamento_complementar ? '"' + itemData.int_apresentacao_orcamento_complementar + '"' : null},` +
      `${itemData.int_aprovado_orcamento_complementar ? '"' + itemData.int_aprovado_orcamento_complementar + '"' : null},` +
      `${itemData.int_veiculo_testado ? '"' + itemData.int_veiculo_testado + '"' : null},` +
      `${itemData.int_veiculo_prontoentrega ? '"' + itemData.int_veiculo_prontoentrega + '"' : null},` +

      `${itemData.valor ? '"' + itemData.valor + '"' : null},` +
      `${itemData.formaPagamento ? '"' + itemData.formaPagamento + '"' : null}` +
      ');';

    console.log(`[${this.title}#insertTbChecklist] {${from}} query`, [query]);

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#insertTbChecklist/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#insertTbChecklist/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#insertTbChecklist/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#insertTbChecklist/db.executeSql] {${from}} | error`, e);
          resolve(false);
        });
    });
  }

  //TODO createTbSync
  async createTbSync(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_sync"(' +
      'id INTEGER,' +
      'checklistType CLOB,' +
      'sync INTEGER,' +

      'str_pneudireitafoto INTEGER,' +
      'str_pneudireitafoto_SYNC INTEGER,' +
      'str_pneuesquerdafoto INTEGER,' +
      'str_pneuesquerdafoto_SYNC INTEGER,' +
      'str_fotoestepe INTEGER,' +
      'str_fotoestepe_SYNC INTEGER,' +
      'str_fotodianteira INTEGER,' +
      'str_fotodianteira_SYNC INTEGER,' +
      'str_fotoesquerda INTEGER,' +
      'str_fotoesquerda_SYNC INTEGER,' +
      'str_fotodireita INTEGER,' +
      'str_fotodireita_SYNC INTEGER,' +
      'str_fototraseira INTEGER,' +
      'str_fototraseira_SYNC INTEGER,' +
      'str_fotocapo INTEGER,' +
      'str_fotocapo_SYNC INTEGER,' +
      'str_fotoavariadianteira INTEGER,' +
      'str_fotoavariadianteira_SYNC INTEGER,' +
      'str_fotoavariaesquerda INTEGER,' +
      'str_fotoavariaesquerda_SYNC INTEGER,' +
      'str_fotoavariadireita INTEGER,' +
      'str_fotoavariadireita_SYNC INTEGER,' +
      'str_fotoavariatraseira INTEGER,' +
      'str_fotoavariatraseira_SYNC INTEGER,' +
      'str_fotoavariacapo INTEGER,' +
      'str_fotoavariacapo_SYNC INTEGER,' +
      'str_fotoadicional1 INTEGER,' +
      'str_fotoadicional1_SYNC INTEGER,' +
      'str_fotoadicional2 INTEGER,' +
      'str_fotoadicional2_SYNC INTEGER,' +
      'str_fotoadicional3 INTEGER,' +
      'str_fotoadicional3_SYNC INTEGER,' +
      'str_fotoassinatura INTEGER,' +
      'str_fotoassinatura_SYNC INTEGER,' +
      'str_imagemassinatura INTEGER,' +
      'str_imagemassinatura_SYNC INTEGER,' +
      'str_fotopneudianteirodireito INTEGER,' +
      'str_fotopneudianteirodireito_SYNC INTEGER,' +
      'str_fotopneudianteiroesquerdo INTEGER,' +
      'str_fotopneudianteiroesquerdo_SYNC INTEGER,' +
      'str_fotopneutraseirodireito INTEGER,' +
      'str_fotopneutraseirodireito_SYNC INTEGER,' +
      'str_fotopneutraseiroesquerdo INTEGER,' +
      'str_fotopneutraseiroesquerdo_SYNC INTEGER,' +
      'str_fotoplaca INTEGER,' +
      'str_fotoplaca_SYNC INTEGER' +
      ');';
    console.log(`[${this.title}#createTbSync] query`, [query]);

    return await new Promise(resolve => {
      this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbSync/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbSync/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbSync/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  async selectTbSync(id: any): Promise<any> {
    let query = `SELECT * FROM "tb_sync" WHERE id = "${id}"`;

    if (id == '*') { query = 'SELECT * FROM "tb_sync"'; }

    console.log(`[${this.title}#selectTbSync] query`, query);

    return await new Promise(resolve => {
      this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              const result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#selectTbSync/db.executeSql] (${query.substring(0, 60).concat('...')}) | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#selectTbSync/db.executeSql] (${query.substring(0, 60).concat('...')}) | result`, result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#selectTbSync/db.executeSql] (${query.substring(0, 60).concat('...')}) return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#selectTbSync/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  //TODO insertTbSync
  async insertTbSync(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#insertTbSync] {${from}} itemData`, itemData);

    const query = 'INSERT INTO "tb_sync"(' +
      'id,' +
      'checklistType,' +
      'sync,' +

      'str_pneudireitafoto,' +
      'str_pneudireitafoto_SYNC,' +
      'str_pneuesquerdafoto,' +
      'str_pneuesquerdafoto_SYNC,' +
      'str_fotoestepe,' +
      'str_fotoestepe_SYNC,' +
      'str_fotodianteira,' +
      'str_fotodianteira_SYNC,' +
      'str_fotoesquerda,' +
      'str_fotoesquerda_SYNC,' +
      'str_fotodireita,' +
      'str_fotodireita_SYNC,' +
      'str_fototraseira,' +
      'str_fototraseira_SYNC,' +
      'str_fotocapo,' +
      'str_fotocapo_SYNC,' +
      'str_fotoavariadianteira,' +
      'str_fotoavariadianteira_SYNC,' +
      'str_fotoavariaesquerda,' +
      'str_fotoavariaesquerda_SYNC,' +
      'str_fotoavariadireita,' +
      'str_fotoavariadireita_SYNC,' +
      'str_fotoavariatraseira,' +
      'str_fotoavariatraseira_SYNC,' +
      'str_fotoavariacapo,' +
      'str_fotoavariacapo_SYNC,' +
      'str_fotoadicional1,' +
      'str_fotoadicional1_SYNC,' +
      'str_fotoadicional2,' +
      'str_fotoadicional2_SYNC,' +
      'str_fotoadicional3,' +
      'str_fotoadicional3_SYNC,' +
      'str_fotoassinatura,' +
      'str_fotoassinatura_SYNC,' +
      'str_imagemassinatura,' +
      'str_imagemassinatura_SYNC,' +
      'str_fotopneudianteirodireito,' +
      'str_fotopneudianteirodireito_SYNC,' +
      'str_fotopneudianteiroesquerdo,' +
      'str_fotopneudianteiroesquerdo_SYNC,' +
      'str_fotopneutraseirodireito,' +
      'str_fotopneutraseirodireito_SYNC,' +
      'str_fotopneutraseiroesquerdo,' +
      'str_fotopneutraseiroesquerdo_SYNC,' +
      'str_fotoplaca,' +
      'str_fotoplaca_SYNC' +
      ')' +
      'VALUES(' +
      `${itemData.id ? itemData.id : null},` +
      `${itemData.checklistType ? '"' + itemData.checklistType + '"' : null},` +
      '0,' +

      `${itemData.str_pneudireitafoto ? itemData.str_pneudireitafoto : 0},` +
      '0,' +
      `${itemData.str_pneuesquerdafoto ? itemData.str_pneuesquerdafoto : 0},` +
      '0,' +
      `${itemData.str_fotoestepe ? itemData.str_fotoestepe : 0},` +
      '0,' +
      `${itemData.str_fotodianteira ? itemData.str_fotodianteira : 0},` +
      '0,' +
      `${itemData.str_fotoesquerda ? itemData.str_fotoesquerda : 0},` +
      '0,' +
      `${itemData.str_fotodireita ? itemData.str_fotodireita : 0},` +
      '0,' +
      `${itemData.str_fototraseira ? itemData.str_fototraseira : 0},` +
      '0,' +
      `${itemData.str_fotocapo ? itemData.str_fotocapo : 0},` +
      '0,' +
      `${itemData.str_fotoavariadianteira ? itemData.str_fotoavariadianteira : 0},` +
      '0,' +
      `${itemData.str_fotoavariaesquerda ? itemData.str_fotoavariaesquerda : 0},` +
      '0,' +
      `${itemData.str_fotoavariadireita ? itemData.str_fotoavariadireita : 0},` +
      '0,' +
      `${itemData.str_fotoavariatraseira ? itemData.str_fotoavariatraseira : 0},` +
      '0,' +
      `${itemData.str_fotoavariacapo ? itemData.str_fotoavariacapo : 0},` +
      '0,' +
      `${itemData.str_fotoadicional1 ? itemData.str_fotoadicional1 : 0},` +
      '0,' +
      `${itemData.str_fotoadicional2 ? itemData.str_fotoadicional2 : 0},` +
      '0,' +
      `${itemData.str_fotoadicional3 ? itemData.str_fotoadicional3 : 0},` +
      '0,' +
      `${itemData.str_fotoassinatura ? itemData.str_fotoassinatura : 0},` +
      '0,' +
      `${itemData.str_imagemassinatura ? itemData.str_imagemassinatura : 0},` +
      '0,' +
      `${itemData.str_fotopneudianteirodireito ? itemData.str_fotopneudianteirodireito : 0},` +
      '0,' +
      `${itemData.str_fotopneudianteiroesquerdo ? itemData.str_fotopneudianteiroesquerdo : 0},` +
      '0,' +
      `${itemData.str_fotopneutraseirodireito ? itemData.str_fotopneutraseirodireito : 0},` +
      '0,' +
      `${itemData.str_fotopneutraseiroesquerdo ? itemData.str_fotopneutraseiroesquerdo : 0},` +
      '0,' +

      `${itemData.str_fotoplaca ? itemData.str_fotoplaca : 0},` +
      '0' +
      ');';

    console.log(`[${this.title}#insertTbSync] {${from}} query`, [query]);

    return await new Promise(resolve => {
      this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#insertTbSync/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#insertTbSync/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#insertTbSync/db.executeSql] {${from}} | error`, e);
          resolve(false);
        });
    });
  }

  //TODO createTbLog
  async createTbLog(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_log"(' +
      'id INTEGER PRIMARY KEY,' +
      'id_agendamento CLOB,' +
      'status CLOB,' +
      'placa CLOB,' +
      'data CLOB,' +
      'checklist CLOB,' +
      'mensagem CLOB' +
      ');';
    console.log(`[${this.title}#createTbLog] query`, [query]);

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#createTbLog/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbLog/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbLog/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbLog/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  //TODO insertTbLog
  async insertTbLog(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#insertTbLog] {${from}} itemData`, itemData);

    const query = 'INSERT INTO "tb_log"(' +
      'id_agendamento,' +
      'status,' +
      'placa,' +
      'data,' +
      'checklist,' +
      'mensagem' +
      ')' +
      'VALUES(' +
      `${itemData.id_agendamento ? '"' + itemData.id_agendamento + '"' : null},` +
      `${itemData.status ? '"' + itemData.status + '"' : null},` +
      `${itemData.placa ? '"' + itemData.placa + '"' : null},` +
      `${itemData.data ? '"' + itemData.data + '"' : null},` +
      `${itemData.checklist ? '"' + itemData.checklist + '"' : null},` +
      `${itemData.mensagem ? '"' + itemData.mensagem + '"' : null}` +
      ');';

    console.log(`[${this.title}#insertTbLog] {${from}} query`, [query]);

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#insertTbLog/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#insertTbLog/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#insertTbLog/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#insertTbLog/db.executeSql] {${from}} | error`, e);
          resolve(false);
        });
    });
  }
}
