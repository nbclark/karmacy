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
      return this.update(obj._table_name, obj)
    }
  }

  insert(table: string, obj: DBEntity): Promise<DBEntity> {
    const json: any = obj.toJSON()
    const columns: string[] = Object.keys(json).map((c) => '${' + c + '}')

    return new Promise<DBEntity>((resolve, reject) => {
      DBContext.db_connection.query(
        'INSERT INTO ' + table + '(${this~}) VALUES(' + columns + ') RETURNING ${this~}, created, updated',
        json
      )
        .then((value) => {
          obj.load(value[0])
          resolve(obj)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  update(table: string, obj: DBEntity): Promise<DBEntity> {
    const json: any = obj.toJSON()
    const id: string = json.id
    const columns: string[] = Object.keys(json).filter((c) => c !== 'id')
    const updates: string[] = columns.map((c, idx) => `${pgp.as.name(c)} = $${idx + 1}`)
    const returns: string[] = columns.map((c, idx) => `${pgp.as.name(c)}`)
    const values: any[] = columns.map((c, idx) => json[c]).concat([id])

    return new Promise<DBEntity>((resolve, reject) => {
      DBContext.db_connection.query(
        `
          UPDATE ${table} SET ${updates.join()}
          WHERE id = $${values.length}
          RETURNING id, ${returns.join()}, created, updated
        `,
        values
      )
        .then((value) => {
          obj.load(value[0])
          resolve(obj)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
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