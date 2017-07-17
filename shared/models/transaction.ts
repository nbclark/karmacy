import Entity from './_entity'
import User from './user'

class GrantTransaction {
  expiration: Date
}

class DebitDonationTransaction {
  target: User
}

class CreditDonationTransaction {
  source: User
}

class PurchaseTransaction {
  product_id: string
}

export default class Transaction extends Entity {

  company_id: string
  source: User
  amount: number
  type: string
  message: string
  metadata: (GrantTransaction | CreditDonationTransaction | DebitDonationTransaction | PurchaseTransaction)

  constructor(obj: any) {
    super(obj)
  }
}