import Context from '../context'
import DBEntity from './_dbentitymixin'
import Company from '../../../shared/models/company'

export default class extends DBEntity(Company, 'companies') {
  constructor(obj: Object) {
    super(obj)
  }

  static create(ctx: Context, name: string, domain: string) {
    var company = new this({ name, domain })
    company.save(ctx)
    return company
  }
}