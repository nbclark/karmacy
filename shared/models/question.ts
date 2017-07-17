import Entity from './_entity'

export default class Question extends Entity {
  id: string
  company_id: string
  team_id: string
  title: string
  question_type: string
  options: string[]
  position: number

  constructor(obj: any) {
    super(obj)
  }
}