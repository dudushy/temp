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
      await this.createTbImage();
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

  async insertTbChecklist(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#insertTbChecklist] {${from}} itemData`, itemData);

    const query = 'INSERT INTO "tb_checklist"(' +
      'sync,' +
      'syncAttempts,' +
      'syncFields,' +
      'syncImages,' +
      'syncStart,' +
      'syncFinish,' +
      'syncTime,' +

      'checklistMode,' +

      'int_id_inspecao,' +
      'int_id_usuario,' +
      'int_id_empresa,' +
      'int_integrado,' +
      'int_integrado_upload,' +
      'int_status_instalacao,' +
      'int_numerofotos,' +

      'str_nomeimagem,' +
      'str_tipo,' + //? str_tipo2
      'str_descricao,' +
      'str_imgdados,' +
      'str_descricaoexterna,' +
      'str_descricaointerna,' +
      'str_descricaoportamalas,' +
      'str_descricaoproblemas,' +
      'str_imagempneuflash1,' +
      'str_imagempneuflash2,' +
      'str_imagempneuflash3,' +
      'str_imagempneuflash4,' +
      'str_imagempneusflash1,' +
      'str_imagempneusflash2,' +
      'str_imagempneusflash3,' +
      'str_imagempneusflash4,' +
      'str_imagempneumodelo1,' +
      'str_imagempneumodelo2,' +
      'str_imagempneumodelo3,' +
      'str_imagempneumodelo4,' +
      'str_marca1,' +
      'str_marca2,' +
      'str_marca3,' +
      'str_marca4,' +
      'str_sulco11,' +
      'str_sulco12,' +
      'str_sulco13,' +
      'str_sulco14,' +
      'str_sulco15,' +
      'str_sulco21,' +
      'str_sulco22,' +
      'str_sulco23,' +
      'str_sulco24,' +
      'str_sulco25,' +
      'str_sulco31,' +
      'str_sulco32,' +
      'str_sulco33,' +
      'str_sulco34,' +
      'str_sulco35,' +
      'str_sulco41,' +
      'str_sulco42,' +
      'str_sulco43,' +
      'str_sulco44,' +
      'str_sulco45' +
      ')' +
      'VALUES(' +
      '0,' +
      '0,' +
      '0,' +
      '0,' +
      'null,' +
      'null,' +
      'null,' +

      `${itemData.checklistMode ? '"' + itemData.checklistMode + '"' : null},` +

      `${itemData.int_id_inspecao ? '"' + itemData.int_id_inspecao + '"' : null},` +
      `${itemData.int_id_usuario ? '"' + itemData.int_id_usuario + '"' : null},` +
      `${itemData.int_id_empresa ? '"' + itemData.int_id_empresa + '"' : null},` +
      `${itemData.int_integrado ? '"' + itemData.int_integrado + '"' : null},` +
      `${itemData.int_integrado_upload ? '"' + itemData.int_integrado_upload + '"' : null},` +
      `${itemData.int_status_instalacao ? '"' + itemData.int_status_instalacao + '"' : null},` +
      `${itemData.int_numerofotos ? '"' + itemData.int_numerofotos + '"' : null},` +

      `${itemData.str_nomeimagem ? '"' + itemData.str_nomeimagem + '"' : null},` +
      `${itemData.str_tipo ? '"' + itemData.str_tipo + '"' : null},` + //? str_tipo2
      `${itemData.str_descricao ? '"' + itemData.str_descricao + '"' : null},` +
      `${itemData.str_imgdados ? '"' + itemData.str_imgdados + '"' : null},` +
      `${itemData.str_descricaoexterna ? '"' + itemData.str_descricaoexterna + '"' : null},` +
      `${itemData.str_descricaointerna ? '"' + itemData.str_descricaointerna + '"' : null},` +
      `${itemData.str_descricaoportamalas ? '"' + itemData.str_descricaoportamalas + '"' : null},` +
      `${itemData.str_descricaoproblemas ? '"' + itemData.str_descricaoproblemas + '"' : null},` +
      `${itemData.str_imagempneuflash1 ? '"' + itemData.str_imagempneuflash1 + '"' : null},` +
      `${itemData.str_imagempneuflash2 ? '"' + itemData.str_imagempneuflash2 + '"' : null},` +
      `${itemData.str_imagempneuflash3 ? '"' + itemData.str_imagempneuflash3 + '"' : null},` +
      `${itemData.str_imagempneuflash4 ? '"' + itemData.str_imagempneuflash4 + '"' : null},` +
      `${itemData.str_imagempneusflash1 ? '"' + itemData.str_imagempneusflash1 + '"' : null},` +
      `${itemData.str_imagempneusflash2 ? '"' + itemData.str_imagempneusflash2 + '"' : null},` +
      `${itemData.str_imagempneusflash3 ? '"' + itemData.str_imagempneusflash3 + '"' : null},` +
      `${itemData.str_imagempneusflash4 ? '"' + itemData.str_imagempneusflash4 + '"' : null},` +
      `${itemData.str_imagempneumodelo1 ? '"' + itemData.str_imagempneumodelo1 + '"' : null},` +
      `${itemData.str_imagempneumodelo2 ? '"' + itemData.str_imagempneumodelo2 + '"' : null},` +
      `${itemData.str_imagempneumodelo3 ? '"' + itemData.str_imagempneumodelo3 + '"' : null},` +
      `${itemData.str_imagempneumodelo4 ? '"' + itemData.str_imagempneumodelo4 + '"' : null},` +
      `${itemData.str_marca1 ? '"' + itemData.str_marca1 + '"' : null},` +
      `${itemData.str_marca2 ? '"' + itemData.str_marca2 + '"' : null},` +
      `${itemData.str_marca3 ? '"' + itemData.str_marca3 + '"' : null},` +
      `${itemData.str_marca4 ? '"' + itemData.str_marca4 + '"' : null},` +
      `${itemData.str_sulco11 ? '"' + itemData.str_sulco11 + '"' : null},` +
      `${itemData.str_sulco12 ? '"' + itemData.str_sulco12 + '"' : null},` +
      `${itemData.str_sulco13 ? '"' + itemData.str_sulco13 + '"' : null},` +
      `${itemData.str_sulco14 ? '"' + itemData.str_sulco14 + '"' : null},` +
      `${itemData.str_sulco15 ? '"' + itemData.str_sulco15 + '"' : null},` +
      `${itemData.str_sulco21 ? '"' + itemData.str_sulco21 + '"' : null},` +
      `${itemData.str_sulco22 ? '"' + itemData.str_sulco22 + '"' : null},` +
      `${itemData.str_sulco23 ? '"' + itemData.str_sulco23 + '"' : null},` +
      `${itemData.str_sulco24 ? '"' + itemData.str_sulco24 + '"' : null},` +
      `${itemData.str_sulco25 ? '"' + itemData.str_sulco25 + '"' : null},` +
      `${itemData.str_sulco31 ? '"' + itemData.str_sulco31 + '"' : null},` +
      `${itemData.str_sulco32 ? '"' + itemData.str_sulco32 + '"' : null},` +
      `${itemData.str_sulco33 ? '"' + itemData.str_sulco33 + '"' : null},` +
      `${itemData.str_sulco34 ? '"' + itemData.str_sulco34 + '"' : null},` +
      `${itemData.str_sulco35 ? '"' + itemData.str_sulco35 + '"' : null},` +
      `${itemData.str_sulco41 ? '"' + itemData.str_sulco41 + '"' : null},` +
      `${itemData.str_sulco42 ? '"' + itemData.str_sulco42 + '"' : null},` +
      `${itemData.str_sulco43 ? '"' + itemData.str_sulco43 + '"' : null},` +
      `${itemData.str_sulco44 ? '"' + itemData.str_sulco44 + '"' : null},` +
      `${itemData.str_sulco45 ? '"' + itemData.str_sulco45 + '"' : null}` +
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

  async createTbImage(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_image"(' +
      'id INTEGER,' +
      'checklistType CLOB,' +
      'sync INTEGER,' +

      'label CLOB,' +
      'data CLOB' +
      ');';
    console.log(`[${this.title}#createTbImage] query`, [query]);

    return await new Promise(resolve => {
      this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#createTbImage/db.executeSql]`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#createTbImage/db.executeSql]`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#createTbImage/db.executeSql] error`, e);
          resolve(false);
        });
    });
  }

  async selectTbImage(id: any): Promise<any> {
    let query = `SELECT * FROM "tb_image" WHERE id = "${id}"`;

    if (id == '*') { query = 'SELECT * FROM "tb_image"'; }

    console.log(`[${this.title}#selectTbImage] query`, query);

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
                // console.log(`[${this.title}#selectTbImage/db.executeSql] (${query.substring(0, 60).concat('...')}) | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#selectTbImage/db.executeSql] (${query.substring(0, 60).concat('...')}) | result`, result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#selectTbImage/db.executeSql] (${query.substring(0, 60).concat('...')}) return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#selectTbImage/db.executeSql] error`, e);
          resolve(null);
        });
    });
  }

  async insertTbImage(itemData: any, from: any): Promise<any> {
    console.log(`[${this.title}#insertTbImage] {${from}} itemData`, itemData);

    const query = 'INSERT INTO "tb_image"(' +
      'id,' +
      'checklistType,' +
      'sync,' +

      'label,' +
      'data' +
      ')' +
      'VALUES(' +
      `${itemData.id ? '"' + itemData.id + '"' : null},` +
      `${itemData.checklistType ? '"' + itemData.checklistType + '"' : null},` +
      `${itemData.sync ? '"' + itemData.sync + '"' : null},` +

      `${itemData.label ? '"' + itemData.label + '"' : null},` +
      `${itemData.data ? '"' + itemData.data + '"' : null}` +
      ');';

    console.log(`[${this.title}#insertTbImage] {${from}} query`, [query]);

    return await new Promise(resolve => {
      this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then(() => {
              console.log(`[${this.title}#insertTbImage/db.executeSql] {${from}}`, [query], ' success');
              resolve(true);
            })
            .catch(e => {
              console.log(`[${this.title}#insertTbImage/db.executeSql] {${from}}`, [query], ' error', e);
              resolve(false);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#insertTbImage/db.executeSql] {${from}} | error`, e);
          resolve(false);
        });
    });
  }

  //TODO createTbLog
  async createTbLog(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_log"(' +
      'id INTEGER PRIMARY KEY,' +
      'id_schedule CLOB,' +
      'status CLOB,' +
      'plate CLOB,' +
      'schedule CLOB,' +
      'checklistType CLOB,' +
      'note CLOB' +
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
