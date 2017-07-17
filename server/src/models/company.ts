import Context from '../context'
import DBEntity from './_dbentitymixin'
import Company from '../../../shared/models/company'

export default class extends DBEntity(Company, 'companies') {
  constructor(obj: Object) {
    super(obj)
  }

  static create(ctx: Context, name: string, domain: string): Promise<Company> {
    var company = new this({ name, domain })
    return new Promise<Company>((resolve, reject) => {
      company.save(ctx)
        .then((obj) => resolve(company))
        .catch((err) => reject(err))
    })
  }
}