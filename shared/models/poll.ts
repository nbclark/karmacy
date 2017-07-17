import Entity from './_entity'
import Question from './question'
import User from './user'

export default class Poll extends Entity {
  company_id: string
  team_id: string
  instance_id: string
  question_id: string
  user: User
  title: string
  question: Question
  answer: any
  suggestion: any
  expires: Date

  constructor(obj: any) {
    super(obj)
  }
}