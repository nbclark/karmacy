import { IMain, IDatabase } from 'pg-promise'
import * as pgPromise from 'pg-promise'
import DBEntity from '../models/dbentity'
import Entity from '../../../shared/models/_entity'

const pgp: IMain = pgPromise({
  query: e => {
    console.log('QUERY:', e.query);
  }
})

export default class DBContext {
  static db_connection: IDatabase<any>

  save(obj: DBEntity): Promise<DBEntity> {
    if (obj._need_save) {
      return this.insert(obj._table_name, obj)
    } else {
      return new Promise<DBEntity>((resolve, reject) => {
        const data = obj.toJSON()
        console.log(obj._need_save)
      })
    }
  }

  insert(table: string, obj: DBEntity): Promise<DBEntity> {
    const json: any = obj.toJSON()
    const columns: string[] = Object.keys(json).map((c) => '${' + c + '}')

    console.log(columns)

    return new Promise<DBEntity>((resolve, reject) => {
      DBContext.db_connection.query(
        'INSERT INTO ' + table + '(${this~}) VALUES(' + columns + ')',
        json
      )
        .then((value) => {
          console.log(value)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  static init(config: any) {
    const cn = {
      host: 'localhost', // 'localhost' is the default;
      port: 5432, // 5432 is the default;
      database: 'karmacy',
      user: 'karmacy',
      password: 'karmacy'
    };
    // You can check for all default values in:
    // https://github.com/brianc/node-postgres/blob/master/lib/defaults.js

    console.log('connecting')
    DBContext.db_connection = pgp(cn)
    console.log('connected')
  }
}