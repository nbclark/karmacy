import Entity from './_entity'

export default class User extends Entity {
  company_id: string
  team_id: string
  role: string
  first_name: string
  last_name: string
  title: string
  email: string
  provider: string
  balance: number
  last_login: Date

  constructor(obj: any) {
    super(obj)
  }
}