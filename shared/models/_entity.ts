const uuidv4 = require('uuid/v4')

type Constructor<T = {}> = new (...args: any[]) => T

export default class Entity {
  _need_save: Boolean
  id: string
  created: Date
  updated: Date
  is_disabled: Boolean
  [key: string]: any

  constructor(obj: any) {
    this.load(obj)
  }

  load(obj: any) {
    this._need_save = !(obj && obj.id)
    this.id = obj && obj.id || uuidv4()
    this.created = obj && obj.created
    this.updated = obj && obj.updated || this.created
  }
}