import Entity from './_entity'
import User from './user'

class GrantTransaction {
  message: string
  expiration: Date
}

class DebitDonationTransaction {
  message: string
  target: User
}

class CreditDonationTransaction {
  message: string
  source: User
}

class PurchaseTransaction {
  message: string
  product_id: string
}

export default class Transaction extends Entity {

  company_id: string
  source: User
  amount: number
  type: string
  metadata: (GrantTransaction | CreditDonationTransaction | DebitDonationTransaction | PurchaseTransaction)

  constructor(obj: any) {
    super(obj)
  }
}