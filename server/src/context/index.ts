import DBContext from './db'
const uuidv4 = require('uuid/v4')

export default class Context {
  db_context: DBContext
  correlation_id: string

  constructor() {
    this.correlation_id = uuidv4()
    this.db_context = new DBContext()
  }

  static init(config: any) {
    DBContext.init(config.pgsql)
  }
}