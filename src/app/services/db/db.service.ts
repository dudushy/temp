/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; //? TEMP

import { Platform } from '@ionic/angular';

import { APP_VERSION } from 'src/environments/version';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  title = 'db';

  APP_VERSION = APP_VERSION.replace(/[^0-9]/g, '');
  DB_NAME = 'template';

  constructor(
    private sqlite: SQLite,  //? TEMP
    public platform: Platform
  ) {
    console.log(`[${this.title}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.title}#constructor/ready]`);

      // await this.dropTable('user', this.title); //!DEBUG
      // await this.dropTable('vars', this.title); //!DEBUG

      await this.createTbUser();
      await this.createTbVars();

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

  async createTbUser(): Promise<any> {
    const query = 'CREATE TABLE IF NOT EXISTS "tb_user"(' +
      'id INTEGER PRIMARY KEY,' +
      'name CLOB,' +
      'age INTEGER' +
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
      'name,' +
      'age' +
      ')' +
      'VALUES(' +
      '1,' +
      `${itemData.name ? '"' + itemData.name + '"' : null},` +
      `${itemData.age ? '"' + itemData.age + '"' : null}` +
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

  async get(table: any, id: any, from: any): Promise<any> {
    const query = id == '*' ? `SELECT * FROM "tb_${table}"` : `SELECT * FROM "tb_${table}" WHERE id = "${id}"`;
    console.log(`[${this.title}#get] {${from}} query`, [query]);

    // return null; //? TEMP

    return await new Promise(resolve => {
      const connection = this.sqlite.create({
        name: `${this.DB_NAME}_${this.APP_VERSION}.db`,
        location: 'default'
      });
      if (!connection) { console.log(`[${this.title}#get/connection] error`, connection); resolve(connection); }
      connection
        .then((db: SQLiteObject) => {
          db.executeSql(query, [])
            .then((data) => {
              // console.log(`[${this.title}#get/db.executeSql]`, [query], ` | data`, data);
              // console.log(`[${this.title}#get/db.executeSql]`, [query], ` | data.rows`, data.rows);

              const result = [];
              for (let item = 0; item < data.rows.length; item++) {
                // console.log(`[${this.title}#get/db.executeSql]`, [query], ` | data.rows.item(${item})`, data.rows.item(item));
                result.push(data.rows.item(item));
              }

              console.log(`[${this.title}#get/db.executeSql] {${from}}`, [query], ' | result', result);
              resolve(result);
            })
            .catch(e => {
              console.log(`[${this.title}#get/db.executeSql] {${from}}`, [query], ` return ${null} | error`, e);
              resolve(null);
            });
        })
        .catch(e => {
          console.log(`[${this.title}#get/sqlite.create] {${from}} | error`, e);
          resolve(null);
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
}
