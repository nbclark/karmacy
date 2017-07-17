import Context from '../context'
import Entity from '../../../shared/models/_entity'
import DBEntity from './dbentity'

type Constructor<T = Entity> = new (...args: any[]) => T

function DbEntityMixin<XEntity extends Constructor>(superclass: XEntity, table: string) {
  return class extends superclass implements DBEntity {

    _table_name: string = table

    save(ctx: Context): Promise<DBEntity> {
      return ctx.db_context.save(this)
    }

    reload(ctx: Context): Promise<Object> {
      return new Promise<Object>((resolve, reject) => {
        //
      })
    }

    toJSON(): any {
      const entity = this.toEntity()
      const columns = Object.keys(this).
        filter((col) =>
          col !== 'created' &&
          col !== 'updated' &&
          !col.startsWith('_')
        //  &&
        // (!entity._need_save || col !== 'id')
        )
      return columns.reduce((obj: any, col: string) => { obj[col] = entity[col]; return obj }, {})
    }

    toEntity(): Entity {
      return this
    }
  }
}

export default DbEntityMixin