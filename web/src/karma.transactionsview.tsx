/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import Component from './karma.component'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<TransactionView> {
  transaction: any
  loggedInUser: any
}

interface IComponentState {
}

class TransactionView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }
  
  componentWillMount () {
  }
  
  render() {
    var transaction = this.props.transaction
    var date = new Date(transaction.Created)
    var time = date.toDateString()

    return (
      <div className="transaction">
        <span className="author">Nicholas Clark</span>
        <span className="amount">{'$' + transaction.Amount}</span>
        <span className="message">{transaction.Message}</span>
        <span className="created">{time}</span>
      </div>
    )
  }
}

class DebitTransactionView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }
  
  componentWillMount () {
  }
  
  render() {
    var transaction = this.props.transaction
    var date = new Date(transaction.Created)
    var time = date.toDateString()

    return (
      <div className="transaction debit">
        <span className="created">{time}</span>
        <span className="author">You</span>
        <span className="action">donated</span>
        <span className="amount">{'$' + transaction.Amount}</span>
        <span>to</span>
        <span className="recipient">{transaction.Target}</span>
        <span className="message">{transaction.Message}</span>
      </div>
    )
  }
}

class CreditTransactionView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }
  
  componentWillMount () {
  }
  
  render() {
    var transaction = this.props.transaction
    var date = new Date(transaction.Created)
    var time = date.toDateString()

    return (
      <div className="transaction credit">
        <span className="created">{time}</span>
        <span className="author">Nicholas Clark</span>
        <span className="action">donated</span>
        <span className="amount">{'$' + transaction.Amount}</span>
        <span>to</span>
        <span className="recipient">you</span>
        <span className="message">{transaction.Message}</span>
      </div>
    )
  }
}

class TransactionsView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }
  
  componentWillMount () {
  }
  
  render() {
    var loggedInUser = this.props.loggedInUser

    return (
      <div className="transaction_view">
        <h5>Recent Transactions</h5>
        <div className="transactions">
            { loggedInUser.Transactions.map((t) => {
              if (t.Type == 'AccountDebitedEvent' || t.Type == 'GrantDonatedEvent') {
                return <DebitTransactionView key={t.ID} transaction={t} />
              } else if (t.Type == 'AccountCreditedEvent') {
                return <CreditTransactionView key={t.ID} transaction={t} />
              }
              return <TransactionView key={t.ID} transaction={t} />
            })}
        </div>
      </div>
    )
  }
}

export default TransactionsView