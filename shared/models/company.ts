import Entity from './_entity'
import Team from './team'
import Question from './question'

class Company extends Entity {
  name: string
  domain: string
  contact: string
  teams: Team[]
  settings: Object
  questions: Question[]

  constructor(obj: any) {
    super(obj)

    this.name = obj.name
    this.domain = obj.domain
  }
}

export default Company