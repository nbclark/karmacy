import Entity from './_entity'

export default class Poll extends Entity {
  company_id: string
  team_id: string
  name: string
  description: string
  price: number
  quantity: number

  constructor(obj: any) {
    super(obj)

    this._table_name = 'products'
  }
}