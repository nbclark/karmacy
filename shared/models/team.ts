import Entity from './_entity'

export default class Team extends Entity {
  company_id: string
  parent_id: string
  name: string

  constructor(obj: any) {
    super(obj)
  }
}