import Context from '../context'
import Entity from '../../../shared/models/_entity'

export default class DBEntity extends Entity {

  _table_name: string

  save(ctx: Context): Promise<Object> {
    return new Promise<Object>((resolve, reject) => { })
  }

  reload(ctx: Context): Promise<Object> {
    return new Promise<Object>((resolve, reject) => { })
  }

  toJSON(): Object {
    return {}
  }

  toEntity(): Entity {
    return this as Entity
  }
}